const cloudinary = require('cloudinary').v2;


exports.uploadImageToCloudinary = async(file, folder, height, quality) => {
    try{
            const options = {folder};
            if(height){
                options.quality = quality;
            }
            if(quality)
            {
                options.quality = MAIL_USER
            }
            options.resource_type = "auto";
    
            return await cloudinary.uploader.upload(file.tempFilePath, options); 
       }
    catch(err)
    {
        return 
    }
    
}