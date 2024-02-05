const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
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


const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findAdmin = await User.findOne({ email });
    if (!findAdmin) {
        throw new Error("Invalid Credentials");
    }

    if (findAdmin.role !== "admin") {
        throw new Error("Not Authorized");
    }
    // if (findAdmin.role !== "admin") throw new Error("Not Authorized");
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateuser = await User.findByIdAndUpdate(
            findAdmin.id, 
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
            _id: findAdmin?._id,
            name: findAdmin?.name,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),


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

const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const findUser = await User.findById(_id).populate("wishlist");
        res.json(findUser);
    }   catch (error) {
        throw new Error(error);
    }
});

const saveAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);    
    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                address: req.body.address,

            },
            {
                new: true,
            }
        );

        res.json(updatedUser);
    }   catch (error) {
        throw new Error(error);
    }
}); 

const userCart = asyncHandler(async (req, res) => {
    const { cart } = req.body;
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        let products = [];
        const user = await User.findById(_id);
        const alreadyExistcart = await Cart.findOne({ orderby: user._id });
        if (alreadyExistcart) {
            alreadyExistcart.remove();
        }
        for (let i = 0; i < cart.length; i++) {
            let object = {};
            object.product = cart[i]._id;
            object.count = cart[i].count;
            const productDetails = await Product.findById(cart[i]._id).select('price').exec();
            
            if (!productDetails || !productDetails.price) {
                // Handle scenarios where product or price is not found
                throw new Error('Product details or price not found');
            }

            object.price = productDetails.price;
            products.push(object);
            
        }
        let cartTotal = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotal = cartTotal + products[i].price * products[i].count;

        }
        let newCart = await new Cart({
            products,
            cartTotal,
            orderby: user?._id, 
        }).save(); 
        const response = {
            cart: newCart,
            cartTotal: cartTotal // Include cartTotal in the response
        };

        res.json(response);

    }   catch (error) {
        throw new Error(error);
    }

});

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user; // Assuming user information is in req.user
    validateMongodbId(_id);
    try {
        // Find the cart for the logged-in user
        const cart = await Cart.findOne({ orderby: _id }).populate('products.product');
        let cartTotal = 0;
        for (let i = 0; i < cart.products.length; i++) {
            cartTotal += cart.products[i].price * cart.products[i].count;
        }

        const response = {
            cart: cart,
            cartTotal: cartTotal
        };

        res.json(response);
    
    }   catch (error) {

        throw new Error(error);
    }
});

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const user = await User.findOne({ _id });
        const cart = await Cart.findOneAndRemove({ orderby: user._id });
 
        res.json(cart);
    }   catch (error) {
        throw new Error(error);
    }
});

const createOrder = asyncHandler(async (req, res) => {
    const COD = req.body;
    const { _id } = req.user;
    validateMongodbId(_id);

    try {
        if (!COD) {
            throw new Error("Create Cash Order failed");
        }

        const user = await User.findById(_id);
        let userCart = await Cart.findOne({ orderby: user._id });
        let finalAmt = 0;

        if (!userCart) {
            return res.status(401).send({ message: "No products found in your cart" });
        } else {
            for (let i = 0; i < userCart.products.length; i++) {
                finalAmt += userCart.products[i].price * userCart.products[i].count;
            }

            let newOrder = await new Order({
                products: userCart.products,
                paymentIntent: {
                    id: uniqid(),
                    method: "COD",
                    amount: finalAmt,
                    status: "Cash on Delivery",
                    created: Date.now(),
                    currency: "usd",
                },
                orderby: user._id,
                orderStatus: "Cash on Delivery",
                
            }).save();
            console.log(newOrder);

            let update = userCart.products.map((item) => {
                return {
                    updateOne: {
                        filter: { _id: item.product._id },
                        update: { $inc: { quantity: -item.count, sold: +item.count } },
                    },
                };  

            });
            
            
            const updated = await Product.bulkWrite(update, {});
            res.json({ message: "success" });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ error: error.message || "Server Error" });
    }
});

const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const userorders = await Order.findOne({ orderby: _id }).populate('products.product').populate('orderby').exec();
        res.json(userorders);
    }   catch (error) {
        throw new Error(error);
    }
});

const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const alluserorders = await Order.find().populate('products.product').populate('orderby').exec();
        res.json(alluserorders);
    }   catch (error) {
        throw new Error(error);
    }
});

const updateOrderstatus = asyncHandler(async (req, res, next) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
        validateMongodbId(id);

        const updateOrderStatus = await Order.findByIdAndUpdate(
            id,
            {
                orderStatus: status,
                paymentIntent: {
                    status: status,
                },
            },
            { new: true }
        );

        res.json(updateOrderStatus);
    } catch (error) {
        // Pass the error to Express's error handling middleware
        next(error); // Instead of throw new Error(error)
    }
});

module.exports = {
    createUser,
    loginUserCtrl,
    getallUser,
    getaUser,
    deleteaUser,
    updatedUser,
    logout,
    handleRefreshToken,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishlist,
    saveAddress,
    userCart,
    getUserCart,
    emptyCart,
    createOrder,
    getOrders,
    updateOrderstatus,
    getAllOrders
};



