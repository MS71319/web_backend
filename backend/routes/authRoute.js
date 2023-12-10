const express = require('express');
const { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser, handleRefreshToken } = require('../controller/userCtrl');
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getallUser);
router.get("/refresh", handleRefreshToken);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", deleteaUser);
router.put("/:edit-user", authMiddleware, updatedUser);
router.get("/refresh", handleRefreshToken);



module.exports = router;
