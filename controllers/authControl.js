const { registerSchema } = require("../middlewares/validator");
const User = require("../model/User");
const { doHash } = require("../utils/hasing");

// register
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const { error, value } = registerSchema.validate({
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
 
  
};
//logout
const logout = async (req, res) => {};
//fetch current user
const fetchCurrUser = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
  fetchCurrUser,
};
