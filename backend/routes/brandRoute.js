const express = require("express");
const { createBrand, updateBrand, deleteBrand, getBrand, getallBrand } = require("../controller/brandCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const asyncHandler = require("express-async-handler");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, asyncHandler(createBrand));
router.put("/:id", authMiddleware, isAdmin, asyncHandler(updateBrand));
router.delete("/:id", authMiddleware, isAdmin, asyncHandler(deleteBrand));
router.get("/:id", asyncHandler(getBrand));
router.get("/", asyncHandler(getallBrand));

module.exports = router;