const { authSchema } = require("../middlewares/validator");
const User = require("../model/User");
const { doHash, doCompare } = require("../utils/hasing");
const jwt = require("jsonwebtoken");

// register
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const { error, value } = authSchema.validate({
      username,
      password,
      email,
    });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(401)
        .json({ succes: false, message: "username already exist!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ succes: false, message: "email already exist!" });
    }

    const hashPassword = await doHash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const result = await newUser.save();
    result.password = undefined;

    res.status(201).json({
      success: true,
      message: "Your account has been created successfully",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  const { error, value } = authSchema.validate({
    email,
    password,
  });
  if (error) {
    return res
      .status(401)
      .json({ success: false, message: error.details[0].message });
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res
      .status(401)
      .json({ succes: false, message: "user does not exist!" });
  }

  const comparePassword = await doCompare(password, existingUser.password);
  if (!comparePassword) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials!" });
  }
  if (!existingUser.verified) {
    return res.status(401).json({ succes: false, message: "is not verified" });
  }
  const token = jwt.sign(
    {
      _id: existingUser._id,
      email: existingUser.email,
      verified: existingUser.verified,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res
    .cookie("Authorization", "Bearer " + token, {
      expiresexpires: new Date(Date.now() + 7 * 24 * 3600000),
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
    })
    .json({
      succes: true,
      message: "logged is successfully",
      token,
    });
};
//logout
const logout = async (req, res) => {
  res
    .clearCookie("Authorization")
    .status(200)
    .json({ success: true, message: "logged out successfully" });
};
//fetch current user
const fetchCurrUser = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
  fetchCurrUser,
};
