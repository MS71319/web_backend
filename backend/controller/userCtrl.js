const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/jwtToken");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const validateMongodbId = require("../utils/validateMongodbid");
const generateRefreshToken = require("../config/jwtToken");

const createUser = asyncHandler(async (req, res, next) => {
    try {
        const email = req.body.email;
        const findUser = await User.findOne({ email: email });
        
        if (!findUser) {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } else {
            const error = new Error("User Already Exists");
            error.statusCode = 400; // Setting status code for the error
            throw error;
        }
    } catch (error) {
        next(error); // Passing error to the error handling middleware
    }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
            findUser.id, 
            {
            refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findUser?._id,
            name: findUser?.name,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),


        });
        
        
    } else {
      throw new Error("Invalid Credentials");
    }

});

const handleRefreshToken = asyncHandler(async (req, res) => {
    try {
        console.log(req.cookies); // Check if cookies are present
        const refreshToken = req.cookies?.refreshToken; // Using optional chaining
        
        if (!refreshToken) {
            throw new Error('No refresh token found');
        }
        
        // Process the refresh token as needed
        
        res.json({ refreshToken });
        console.log(refreshToken);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const getallUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        // Handle errors appropriately, you can send an error response here if needed
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const getaUser = await User.findById(id);
        if (!getaUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(getaUser);
    } catch (error) {
        // Handle errors appropriately, you can send an error response here if needed
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        if (!deleteaUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(deleteaUser);
    } catch (error) {
        // Handle errors appropriately, you can send an error response here if needed
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);    
    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                name: req?.body?.name,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
                password: req?.body?.password,
            },
            {
                new: true,
            }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(updatedUser);
    } catch (error) {
        // Handle errors appropriately, you can send an error response here if needed
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const logout = asyncHandler(async (req, res) => {

});

module.exports = { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser, logout, handleRefreshToken };