const express = require("express");
const { createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry, getallEnquiry } = require("../controller/enqCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const asyncHandler = require("express-async-handler");
const router = express.Router();

router.post("/", asyncHandler(createEnquiry));
router.put("/:id", authMiddleware, isAdmin, asyncHandler(updateEnquiry));
router.delete("/:id", authMiddleware, isAdmin, asyncHandler(deleteEnquiry));
router.get("/:id", asyncHandler(getEnquiry));
router.get("/", asyncHandler(getallEnquiry));

module.exports = router;