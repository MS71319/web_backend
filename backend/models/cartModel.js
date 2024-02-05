const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const cartSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                count: Number,
                price: Number,
            },
        ],
        CartTotal: Number,
        totalAfterDiscount: Number,
        orderby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

    },
    {
        timestamps: true, // This line adds createdAt and updatedAt fields
    }
);

//Export the model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;