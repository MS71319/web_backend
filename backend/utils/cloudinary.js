const cloudinary = require("cloudinary").v2; 

cloudinary.config({
  Cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,

});


const cloudinaryUploadImg = async (filesToUpload) => {
    const uploadResults = await Promise.all(
      filesToUpload.map(async (file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(file.path, { resource_type: "auto" }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({ url: result.secure_url });
            }
          });
        });
      })
    );
    return uploadResults;
  };



module.exports = cloudinaryUploadImg;