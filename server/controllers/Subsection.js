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

// Update SubSection
exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, title, description } = req.body
      const subSection = await SubSection.findById(sectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      return res.json({
        success: true,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }

// deleteSubSection
exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }



