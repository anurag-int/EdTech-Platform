
const mailSender = require("../utils/mailSender");

exports.contactUs = async(req, res) => {
    try{
        const {firstName, lastName, email, phoneNo, message} = req.body;

        if(!firstName || !lastName || !email || !phoneNo || !message)
        {
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }

        // sending mail to own company
        const mailToCompany = await mailSender(

            "studymotion.support@gmail.com",
            `From email : ${email}`
            `User's Name : ${firstName} ${lastName}
             User's Email : ${email}
             User's message : ${messsage}`
        );

        // sending confirmation mail to user from company mail
        const emailResponse = await mailSender(

            email, 
            `Greeetings ${firstName}, from StudyMotion` ,
            `Thanks for reaching out us
                    we will be contact you soon.`
        );


        return res.status(200).json({
            success : true,
            message : "Successfully received"
        });
    }
    catch(err)
    {
        return res.status(500).json({
            success : false,
            message : "Try Again"
        });
    }
    


}