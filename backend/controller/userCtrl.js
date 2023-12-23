const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/jwtToken");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const validateMongodbId = require("../utils/validateMongodbid");
const generateRefreshToken = require("../config/refreshtoken");
const crypto = require("crypto");
const sendEmail = require("./emailCtrl");

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
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if(!user) throw new Error("No Refresh Token present in db or not matched")
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) {
        throw new Error("There is something wrong with the refresh Token");
      }
      const accessToken = generateToken(user?._id)
      res.json({ accessToken });

    });
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
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");

    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });

    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204);
    }

    // Clear the refreshToken in the database for the user
    await User.findByIdAndUpdate(user._id, { refreshToken: "" });

    // Clear refreshToken cookie on client-side
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });

    res.sendStatus(204);
});

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongodbId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    }   else {
        res.json(user);
    }
});


const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        throw new Error("User not found with this email");
    }
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetUrl = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;

        // Use the sendEmail function to send the email
        // await sendEmail({
            
        //     email: user.email,
        //     text: "Hey User",
        //     subject: "Forgot Password Link",
        //     htm: resetURL,


        // });

        const data = {
            to: email,
            text: "Hey, User",
            subject: "Forgot Password Link",
            htm: resetUrl,
        };
        await sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error(" Token Expired, Please Try Again");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});




module.exports = { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser, logout, handleRefreshToken, updatePassword, forgotPasswordToken, resetPassword };