const Section = require("../models/Section");
const Course = require("../models/Course");



// algorithm to create a Section
        // data fetch
        // data validation
        // create section
        // update Section in Course of the an Instructor.
exports.createSection = async(req, res) => {
    try{
        
        const {sectionName, courseId} = req.body;

        if(!sectionName || !courseId)
        {
            return res.status(400).json({
                success : false,
                message : "Missing Details"
            })
        }

        const newSection = await Section.create({sectionName});

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
                                                            {
                                                                $push:{
                                                                    courseContent : newSection._id
                                                                }
                                                            },
                                                            {new : true}
                                                        ); 
        //Pending : use populate to replace section/sub-section both in the updatedCourseDetsails

        return res.status(200).json({
            success : true,
            message : "Section Created Successfully",
            updatedCourseDetails
        })

    }

    catch(err)
    {
        return res.status(500).json({
            success : false,
            message : "Unable to Create Please try again"
        })
    }
}