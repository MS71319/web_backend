const express = require('express');
const { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishlist, saveAddress, userCart, getUserCart, emptyCart, createOrder, getOrders, updateOrderstatus } = require('../controller/userCtrl');
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword)
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);

router.get("/cart", authMiddleware, getUserCart);
router.get("/all-users", getallUser);
router.get("/get-orders", authMiddleware, getOrders);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.put("/order/update-order/:id", authMiddleware, isAdmin, updateOrderstatus);

router.get("/wishlist", authMiddleware, getWishlist);

router.post("/cart/cash-order", authMiddleware, createOrder);
router.delete("/:id", deleteaUser);

router.delete('/empty-cart', authMiddleware, emptyCart);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);
router.get("/refresh", handleRefreshToken) ;



module.exports = router;
