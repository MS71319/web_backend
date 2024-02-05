const express = require("express");
const router = express.Router();

// Import required controller and middleware functions
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  uploadImages,
  deleteImages
} = require('../controller/productCtrl');

const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");


router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/upload/", authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages);
router.get("/", getAllProduct);
router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishlist); // This route seems different from the error message
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);


module.exports = router;