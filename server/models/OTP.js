const mongoose = require("mongoose");

const OTPSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 5*60
    }
});

//a function ---> to send email
async function sendVerificationEmail(email, otp){
    try {
        const mailResponse = await mailSender(email, "Verification Email from StudyMotion", otp);
        console.log("Email Send Successfully: ", mailResponse);
    }
    catch(error){
        console.log("error occured while sending mails : ", error);
    }
}

// sending OTP in mail before saving into database.
OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})  

module.exports = mongoose.model("OTP", OTPSchema);