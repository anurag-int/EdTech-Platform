const Course = require("../models/Course");
const Tag = require("../models/tags");
const User = require("../models/User");

const {uploadImageToCloudinary} = require("../utils/imageUploader");


//  create course handler functions

exports.createCourse = async (req, res) => {

    try{
        //fetch data
        const {courserName, courseDescription, whatYouWillLearn, img} = req.body;
    
        //get thumbnail
        const thumbnail = req.files.thumbnail;

        //validation
        if(!courserName || !courseDescription || !whatYouWillLearn || !img)
        {
            return res.status(400).json({
                success : false,
                message : "Please Fill required details!"
            })
        }
    }
    catch(err)
    {
        return res.this.status(404).json({
            success : false,
            message : "Try Again"
        })
    }

    

     
} 