const express = require("express");
const router = express.Router();

const {
  registerUser,
  login,
  forgotPassword,
  resetPassword,
  verifyOtp
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/verify-otp", verifyOtp);

module.exports = router;
