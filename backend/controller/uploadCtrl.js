const fs = require("fs");
const asyncHandler = require("express-async-handler");
const { cloudinaryUploadImg, cloudinaryDeleteImg } = require("../utils/cloudinary");



const uploadImages = asyncHandler(async (req, res) => {

    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        
        // Debugging: Log the structure of files
        console.log(files);

        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            console.log(newpath);
            urls.push(newpath);
            // fs.unlinkSync(path);
        }
        // const images = urls.map((file) => file);
        const images = urls.map(({ url, public_id, asset_id }) => ({ url, public_id, asset_id }));


        // res.json(images);
        res.json({ upload: { images } });


    } catch (error) {
        console.error("Error occurred during image upload:", error);
        res.status(500).json({ error: "Error occurred during image upload" });
    }
});

const deleteImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const deletedImage = await cloudinaryDeleteImg(id, "images");
      // Respond with appropriate data after successful deletion
      res.json({ message: "Image Deleted", deletedImage });
    } catch (error) {
      console.error("Error occurred during image deletion:", error.message);
      res.status(500).json({ error: error.message || "Error occurred during image deletion" });
    }
  });

module.exports = {
  uploadImages, 
  deleteImages,
};