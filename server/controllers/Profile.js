const Profile = require("../models/Profile");
const User = require("../models/User");



//get data
//get userId
//validation
//findByProfileID
//update profile and save() in db
// return response

exports.updateProfile = async (req, res)=>{
    try{
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;
        const id = req.user.id;

        if(!contactNumber || !gender || !id)
        {
            return res.this.status(400).json({
                success : false,
                message : "All field are required"
            });
        }

        const userDetails = await User.findById(id);

        const profileId = userDetails.additionalDetails._id;

        const profileDetails = await Profile.findById(profileId);

       profileDetails.dateOfBirth = dateOfBirth;
       profileDetails.about = about;
       profileDetails.contactNumber = contactNumber;
       profileDetails.gender = gender;
       await profileDetails.save();
        

        return res.status(200).json({
            success : true,
            message : "Profile Updated Successfully",
            profileDetails
        })
    }


    catch(err)
    {
        return res.status(500).json({
            success : false,
            error : err.message,
            message : "Internal Server Error"
        })
    }
}


//delete Account
    //getID
    //validation
    //delete profile_details
    //User delete
    //return
exports.deleteAccount = async(req, res)=>{
    try{
        const id = req.user.id;

        const userDetails = await User.findById(id);

        if(!userDetails)
        {
            return res.status(400).json({
                success : false,
                message : "User not found"
            })
        }

        await Profile.findByIdAndDelete({_id : userDetails.additionalDetails});

        await User.findByIdAndDelete({_id : id});

        return res.status(200).json({
            success : true,
            message : "User Successfully Deleted"
        })
    }
    catch(err)
    {
        return res.status(500).json({
            success : false,
            error : err.message,
            message : "Internal Server Error!"
        })
    }
}

