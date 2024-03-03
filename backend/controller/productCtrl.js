const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongodbId = require("../utils/validateMongodbid");

const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    }   catch (error) {
        throw new Error(error);
    }

});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
        });
        res.json(updatedProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params; // Destructure the id correctly
    try {
        const deletedProduct = await Product.findOneAndDelete({ _id: id }); // Use _id for finding the product
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(deletedProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const getaProduct = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});


const getAllProduct = asyncHandler(async (req, res) => {
    try {
        // Extract query parameters and remove excluded fields
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);

        // Convert the query object to a MongoDB query
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        let query = Product.find(JSON.parse(queryStr));

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        }    
        // }   else {
        //     query=query.select("__v");
        // }

        const product = await query;
        // Send the products as a JSON response
        res.json(product);
    } catch (error) {
        // Handle errors appropriately (e.g., log the error)
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;

    try {
        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);

        if (alreadyAdded) {
            const user = await User.findByIdAndUpdate(
                _id,
                { $pull: { wishlist: prodId } },
                { new: true }
            );
            res.json(user);
        } else {
            const user = await User.findByIdAndUpdate(
                _id,
                { $push: { wishlist: prodId } },
                { new: true }
            );
            res.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
});


  

module.exports = { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist };
