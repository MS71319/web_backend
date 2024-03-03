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

} = require('../controller/productCtrl');

const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");


router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/", getAllProduct);
router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishlist); // This route seems different from the error message
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);


module.exports = router;
