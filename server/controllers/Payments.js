const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");


// capture the payment and initaiate the razorpay order
    // get courseID and userId
    // validation CourseID
    // valid courseDetails
    // user already paid or not for this course
    // order create 
    // response
exports.capturePayment = async(req, res) => {
    const {course_id} = req.body;

    const userId = req.user.id;

    if(!course_id)
    {
        return res.status(400).json({
            success :false,
            message : "Please provide valid course Id"
        })
    }

    let course;
    try{
        course = await Course.findOne(course_id);

        if(!course)
        {
            return res.status(400).json({
                success : false,
                message : "Couldn't find the course"
            });
        }

        // converting UserId into ObjectId because in req.body we have got in the form of String and in the database course.userEnrolled it is of ObjectId so we are converting req.body(userId) ---> ObjectTd
        const uid = new mongoose.Types.ObjectId(userId);
        
        if(course.studentsEnrolled.include(uid))
        {
            return res.status(400).json({
                success : false,
                message : "Student is already enrolled"
            })
        }

    }
    catch(err)
    {
        return res.status(500).json({
            success : false,
            error : err.message,
            message : "Internal Server Error"
        })
    }

    // Order Creation
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount : amount * 100,
        currency : currency,
        receipt : Math.random(Date.now()).toString(),
        notes : {
            courseId : course_id,
            userId
        }
    };

    try{
        // initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        
        // return response
        return res.status(200).json({
            success : true,
            couseName : course.courseName,
            courseDescription : course.courseDescription,
            thumbnail : course.thumbnail,
            orderId : paymentResponse.orderId,
            amount : paymentResponse.amount
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "Could not initiate Order"
        })
    }


}
