const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRETE,
})

const uploadImageToCloudinary = async (imagePath)=>{
    try{
       const result = await cloudinary.uploader.upload(imagePath,{
        fetch_format: 'auto',
        quality: 'auto',
        use_filename: true,
        unique_filename: false,
       })
       if(result && result?.secure_url){
          fs.unlinkSync(imagePath);
          return result?.secure_url
       }
    }
    catch(err){
        console.log(err,"err----1")
        return false
    }
}

module.exports = {
    uploadImageToCloudinary
}