const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
require("dotenv").config();
const {uploadImageToCloudinary} = require("../utils/imageUploader");

// create SubSection
    // fetch data from req.body
    // fetch video from file/video
    // validate data
    // upload video to cloudinary
    // fetch url from cloudinary response
    // create a subSection
    // update Section with SubSection Object
    // return response
    
exports.createSubSection = async (req, res) => {
    try{

        const {sectionId, title, timeDuration, description} = req.body;
        
        const video = req.files.videoFile; 

        if(!title || !timeDuration || !description || !sectionId || !video)
        {
            return res.status(400).json({
                success : false,
                message : "All Fields Are required"
            })
        }

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create({
                                                        title : title,
                                                        description : description,
                                                        duration : duration,
                                                        videoUrl : uploadDetails.secure_url
                                                        });

        const updatedSection = await Section.findByIdAndUpdate({_id : sectionId},
                                            {
                                                $push: {
                                                    subSection : subSectionDetails._id
                                                }
                                            },
                                            {new : true}
                                        );    
                                        
        //Pending: log updated section here, after adding populate query

        return res.status(200).json({
            success : true,
            message : "Sub Section Created",
            updatedSection
        })
                                         
    }
    catch(err)
    {
        return res.status(500).json({
            success : false,
            message : "Internal Server Error!",
            error : err.message
        })
    }
}

// Pending Update SubSection
// Pending deleteSubSection


