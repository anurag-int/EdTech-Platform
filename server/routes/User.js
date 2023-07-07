// Import the required modules
const express = require("express")
const router = express.Router()

//Important the required controllers and middleware functions

const {login, signup, sendotp, changePassword} = require("../controllers/Auth");

const {resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");

const {auth} = require("../middleware/auth");



// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Routes for Login, Signup, and Authentication
router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
router.post("/changepassword", auth, changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************


//Router for generating a reset password token --> forgetPassword
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
