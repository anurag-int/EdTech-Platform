const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');

//OTP sender
exports.sendOTP = async (req, res)=>{

    try
    {
        // fetching email from the request body
        const {email} = req.body;


        const checkUserPresent = await User.findOne({email})
        if(checkUserPresent)
        {
            return res.status(401).json({
                success : false,
                message : "User already registered"
            })
        }

        //generate OTP  --> generates 6 digit otp with numerical value only 
        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false
        });

        console.log("OTP generated: ", otp);

        //check unique otp or not
        const result = await OTP.findOne({otp : otp});

        // check till we got the unique OTP in DB.
        while(result)
        {
            otp = otpGenerator(6, {
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false
            })
        }

        // Storing this OTP in our DataBase.
        const otpPayload = {email, otp};

        // create an entry in DB for OTp
        const otpBody = await OTP.create(optPayload);
        console.log(otpBody);

        res.status(200).json({
            success : true,
            message : "OTP send Successfully"
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }


    
}




//signup



// login


//Change Password

