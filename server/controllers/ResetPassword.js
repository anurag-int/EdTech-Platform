const User = require("../models/User");
const mailSender = require("../utils/mailSender");



// Forget PasswordToken Algorithm
        // get email from req body
        // check wheather the user is exists or not.
        // generate link to send in the User's mail to change the password which the user has forgotten.
        // generate token 
        // update user by adding token and expiration time.
        // create url
        //  send the mail containing to url
        // return response

exports.resetPasswordToken = async (req, res)=>{
    try{
        const email = req.body;

        const user = await User.findOne({email});
    
        if(!user)
        {
            return res.status(401).json({
                success : false,
                message : "Email is Not Registered"
            })
        }
    
        const token = crypto.randomUUID;
    
        const updatedDetails = await User.findOneAndUpdate({email : email},
                                                            {token : token,
                                                             tokenresetPasswordExpires : Date.now() + 5*60*1000
                                                            },
                                                            {new : true}); 
                                                            // new : true will send the updated data in the response. means in updatedDetails variable
    
        const url = `http://localhost:3000/update-Password/${token}`
    
        await mailSender(email,
                        "Password Reset Link",
                        `Password Reset Link: ${url}`)
    
        return res.status(200).json({
            success : true,
            message : "Email Send Successfully, Please check email and change password"
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success : false,
            message : "Something went wrong while sending reset password link"
        })
    }
}


//Forget Password

