const cloudinary = require("cloudinary").v2; 

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,

});


// const cloudinaryUploadImg = async (fileToUploads) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(fileToUploads, (result) => {
//       resolve(
//         {
//           url: result.secure_url,
//         },
//         {
//           resource_type: "auto",
//         }
//       );
//     });
//   });

// };


const cloudinaryUploadImg = async (fileToUploads) => {
  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(fileToUploads, { resource_type: "auto" });

    // Extract the secure URL of the uploaded file from the result
    const secureUrl = result.secure_url;

    return {
      url: secureUrl,
      asset_id: result.asset_id,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Error occurred during image upload to Cloudinary:", error);
    // Instead of rethrowing the error, handle it more explicitly
    throw new Error("Error occurred during image upload to Cloudinary");
    // Optionally, you can also return a specific error response object
    // return { error: "Error occurred during image upload to Cloudinary" };
  }
};


// cloudinary.js
const cloudinaryDeleteImg = async (fileToDelete) => {
  try {
    const result = await cloudinary.uploader.destroy(fileToDelete, { resource_type: "image" });
    const secureUrl = result.secure_url;

    return {
      url: secureUrl,
      asset_id: result.asset_id,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Error occurred during image deletion from Cloudinary:", error);
    throw new Error(`Error occurred during image deletion from Cloudinary: ${error.message}`);
  }
};
module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
