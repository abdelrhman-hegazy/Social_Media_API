const express = require("express");
const {
  register,
  login,
  logout,
  fetchCurrUser,
} = require("../controllers/authControl");
const router = express.Router();

// register
router.post("/register", register);
//login
router.post("/login", login);
//logout
router.post("/logout", logout);
//fetch current user
router.get("/fetchCurrUser", fetchCurrUser);


module.exports = router