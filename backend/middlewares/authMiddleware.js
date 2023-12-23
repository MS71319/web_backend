const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            throw new Error("Not Authorized, Please provide a valid token");
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new Error("User not found");
        }

        req.user = user; // Set req.user here
        next();
    } catch (error) {
        res.status(401).json({ error: error.message || "Not Authorized" });
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    try {
        const { email } = req.user;

        if (!email) {
            throw new Error("Email not found in user details");
        }

        const adminUser = await User.findOne({ email });

        if (!adminUser || adminUser.role !== "admin") {
            throw new Error("You are not an Admin");
        }

        next();
    } catch (error) {
        res.status(403).json({ error: error.message || "Forbidden" });
    }
});

module.exports = { authMiddleware, isAdmin };