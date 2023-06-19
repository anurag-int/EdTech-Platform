const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");



// authentication
exports.auth = async (req, res, next) =>{
    try {
        // extract token
        const token = req.cookie.token || req.body.token || req.header("Authorisation").replace("Bearer", "");

        // if token missing, then return the response

        if(!token){
            return res.status(401).json({
                success : false,
                message :"Token is missing"
            })
        }

        // verify the token
        try{
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error)
        {
            return res.status(401).json({
                success : false,
                message : "Token is invalid"
            })
        }
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            success : false,
            message : "Something went wrong while valididating the token"
        })
    }
}




// //isStudent
exports.isStudent = async(req, res, next)=>{
    try{
            if(req.user.accountType !== "Student"){
                return res.status(401).json({
                    success : false,
                    message : "This is a Protected route for Students only"
                })
            }
            next();
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "user role cannot be verified, please try again"
        })
    }
}


// //isInstructor
exports.isInstructor = async(req, res, next)=>{
    try{
            if(req.user.accountType !== "Instructor"){
                return res.status(401).json({
                    success : false,
                    message : "This is a Protected route for Instructor only"
                })
            }
            next();
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "user role cannot be verified, please try again"
        })
    }
}


// //isAdmin
exports.isAdmin = async(req, res, next)=>{
    try{
            if(req.user.accountType !== "Admin"){
                return res.status(401).json({
                    success : false,
                    message : "This is a Protected route for Admin only"
                })
            }
            next();
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "user role cannot be verified, please try again"
        })
    }
}