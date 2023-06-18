const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const { response } = require("express");
const bcrypt = require("bcrypt");

//OTP sender
exports.sendOTP = async (req, res) => {
  try {
    // fetching email from the request body
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    //generate OTP  --> generates 6 digit otp with numerical value only
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP generated: ", otp);

    //check unique otp or not
    const result = await OTP.findOne({ otp: otp });

    // check till we got the unique OTP in DB.
    while (result) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    // Storing this OTP in our DataBase.
    const otpPayload = { email, otp };

    // create an entry in DB for OTp
    const otpBody = await OTP.create(optPayload);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: "OTP send Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//signup
exports.signUp = async (req, res) => {
  try {
    // data fetch
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(401).json({
        success: false,
        message: "Fill the required Details",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password doesn't match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User Already Registered",
      });
    }

    // find most recent OTP from the Database so that we can match the otp from the User's OTP
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    //validate OTP from the User's OTP

    if (recentOtp.length == 0) {
      // OTP not found
      return response.status(400).json({
        success: false,
        message: "OTP not Found",
      });
    } else if (otp !== recentOtp.otp) {
      //Invalid OTP
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    //Now Hash the Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      contactNumber: null,
      about: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User Successfully Registered",
      user
    });
  } 

  catch (error) 
  {
    console.log(error);
    return res.status(500).json({
        success : false,
        message : "Please Try Again..."
    })
  }
};

// login

//Change Password
