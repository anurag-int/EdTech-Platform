const Tag = require("../models/tags");

// createTag Algorithm

        //fetch the data
        // data validation
        // create a entry in DB
        // return
exports.createTag = async(req, res) => {
    try{
        
        // fetching data
        const {name, description} = req.body;

        // data validation
        if(!name || !description)
        {
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }

        // create a entry in DB
        const tagDetails = await Tag.create({
            name : name,
            description : description
        })
        console.log(tagDetails);

        // return 
        return res.status(200).json({
             success : false,
             message : "Tag Create Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}


// getAllTags  handler function

exports.showAlltags = async(req, res)=>{
    try{
        const allTags = await Tag.find({},{name : true, description : true});
        return res.status(200).json({
            success : true,
            message : "All tags are successfully Returned",
            allTags
        })
    }
    catch(err)
    {
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}