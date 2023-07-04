const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

// createRating
    //get User id
    //fetchData from req body
    //check if the user is enrolled on that course or not
    //check if the user has already review on that course or not
    //if not he can give review and rating
    //Update it into Course Schema
    //response
exports.createRating = async (req, res) => {
    try{
        const userId = req.user.id;
        const {review, rating, courseId} = req.body;


        //studentsEnrolled : {$elemMatch : {$eq : userId}} ---> this will check if the user is enrolled in the course or not.
        
        const courseDetails = await Course.findOne({_id : userId,
                                                    studentsEnrolled : {$elemMatch : {$eq : userId}}
                                                });

        if(!courseDetails)
        {
            return res.status(400).json({
                success : true,
                message : "User not Enrolled for the course"
            })
        }

        const alreadyReviewed = await RatingAndReview.findOne(
                                                                {
                                                                    user : userId,
                                                                    course : courseId
                                                                }
                                                             );
        if(alreadyReviewed)
        {
            return res.status(403).json({
                success : false,
                message : "User already Reviewed"
            })
        }

        const ratingReview = await RatingAndReview.create({
                                                             rating : rating,
                                                             review : review,
                                                             course : courseId,
                                                             user : userId
                                                          });
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id : courseId},
                                        {
                                            $push : {
                                                ratingAndReviews : ratingReview._id
                                            }
                                        },
                                        {new : true}
                                        );

        console.log(updatedCourseDetails);
                                    
        return res.status(200).json({
            success : true,
            message : "Successfully Reviewed and Rating",
            ratingReview
        })

    }
    catch(error)
    {
        return res.status(500).json({
            success : true,
            message : error.message
        })
    }
}


//getAverageRating of any course
    //get course ID
    //calculate average Rating
    // if rating availabe > 0 then there exists rating so return the average rating
    // if rating availabe = 0 then return 0
    //return rating

exports.getAverageRating = async (req, res) => {
    try{
        const courseId = req.body.couseId;

        const result = await RatingAndReview.aggregate([
            {
                $match : {
                    course : new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group : {
                            _id : null,
                            getAverageRating : {$avg : "$rating"}
                }
            }
        ])

        if(result.length > 0)
        {
            return res.status(200).json({
                success : true,
                averageRating : result[0].averageRating
            })
        }

        return res.status(200).json({
            success : true,
            message : "Average Rating is 0, no rating availabe",
            averageRating : 0
        })

    }
    catch(error)
    {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}




//getAllRatingAndReviews
    
exports.getAllRating = async (req, res) => {
    try{
        const allReviews = await RatingAndReview.find({})
                                 .sort({rating : "desc"})
                                 .populate({
                                    path : "user",
                                    select : "firstName lastName email image"
                                 })
                                 .populate({
                                    path : "course",
                                    select : "courseName"
                                 })
                                 .exec();

        return res.status(200).json({
            success : true,
            message : "All reviews fetched Successfully"
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
