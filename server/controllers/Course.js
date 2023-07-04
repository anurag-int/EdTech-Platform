const Course = require("../models/Course");
const Category = require("../models/category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


//  create course handler functions

exports.createCourse = async (req, res) => {

    try{
        
            //fetch data
            const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;
        
            //get thumbnail
            const thumbnail = req.files.thumbnailImage;

            //validation
            if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag)
            {   
                return res.status(400).json({
                    success : false,
                    message : "Please Fill required details!"
                })
            }

            // check for instructor
            const userId = req.user.id;
            const instructorDetails = await User.findById(userId);
            console.log("Instructor Details: ", instructorDetails);
            // Todo: Verify that userId and instructorDetails._id are same or diffrent ?

            if(!instructorDetails)
            {
                return res.status(404).json({
                    success : false,
                    message : "Instructor Details not found"
                })
            }

            // check given tag is valid or not
            const tagDetails = await Tag.findById(tag);

            // tag validation
            if(!tagDetails)
            {
                return res.status(404).json({
                    success : false,
                    message : "Tag Details not found"
                })
            }

            //Upload Image to Cloudinary
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

            //create an entry for new course

            const newCourse = await Course.create({
                courseName,
                courseDescription,
                instructor :  instructorDetails._id,
                whatYouWillLearn,
                price,
                tag : tagDetails._id,
                thumbnail : thumbnailImage.secure_url
            })

            //  add the new course to the user schema of Instructor

            await Course.findByIdAndUpdate({_id : instructorDetails._id},
                                        {
                                                $push:{
                                                    courses : newCourse._id
                                                }
                                        },
                                        {new : true});
            

            //Updated the TAG Schema
            await Tag.findByIdAndUpdate({_id : tagDetails._id},
                {
                    $push : {
                        course : newCourse._id
                    }
                },
                {new : true});
            

            return res.status(200).json({
                success : true,
                message : "Course Created Successfully",
                data : newCourse
            })
         
    }
    catch(err)
    {
        return res.this.status(500).json({
            success : false,
            message : "Failed to create Course"
        })
    }

    

     
} 



// getAllCourses handeler function

exports.showAllCourses = async (req, res) => {
    try{

        // ToDo : change the below statement incrementally
        const allCourses = await Course.find({}); 
                                             

        return res.status(200).json({
            success : true,
            message : 'Data for all courses fetched successfully',
            data : allCourses
        })
    }
    catch(error)
    {
        return res.this.status(404).json({
            success : false,
            message : "Cannot fetch course data",
            error : error.message
        })
    }
}


// getCourseDetails handeler function

exports.getCourseDetails = async (req, res) => {
    try{
        
        const {courseId} = req.body;
        const courseDetails = await Course.find(
                                                    {_id : courseId}
                                                ).populate(
                                                {
                                                    path:"instructor",
                                                    populate : {
                                                        path : "additionalDetails"
                                                    }
                                                }
                                            )
                                            .populate("category")
                                            .populate("ratingAndreviewss")
                                            .populate({
                                                path : "courseContent",
                                                populate:{
                                                    path : "subSection"
                                                }
                                            })
                                            .exec();

        // validation
        if(!courseDetails)
        {
            return res.status(400).json({
                success : false,
                message : `Could not find the course with ${courseId}`
            })
        }

        return res.status(200).json({
            success : true,
            message : "Course Details Fetched Successfully",
            data : courseDetails
        })
    }
    catch(error)
    {
        return res.this.status(404).json({
            success : false,
            message : "Cannot fetch course data",
            error : error.message
        })
    }
}