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



// Algorithm to update Schema
    // fetch data
    // validate data
    //update data in section

exports.updateSection = async(req, res) => {
    try{
        const {sectionName, sectionId} = req.body;

        if(!sectionName || !sectionId)
        {
            return res.status(400).json({
                success : false,
                message : "Fill all necessary Details"
            })
        }

        const Section = await Section.findByIdAndUpdate(sectionId,
                                                                {
                                                                    sectionName : sectionName
                                                                },
                                                                {new : true}
                                                             );

        return res.status(200).json({
            success : true,
            message : "Section updated Successfully",
            Section
        })

    }
    catch(error) 
    {
        return res.status(500).json({
            success : false,
            message : "Unable to update Schema, please try again",
            error : error.message
        })
    }
}


// Algorithm to delete Section in Any Course
    // get ID
    // use findByIdAndDelete
    // return response


exports.deleteSection = async(req, res) => {
    try{
        const sectionId = req.params;

        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success : true,
            message : "Section Successfully Deleted"
        })
    }                                 
    catch(err)
    {
        return res.status(500).json({
            success : false,
            message : "Unable to update Schema, please try again",
            error : err.message
        })
    }
}
