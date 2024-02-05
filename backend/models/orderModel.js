const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                count: Number,
    
    
            },
        ],
        paymentIntent: {
            id: String,
            method: String,
            amount: Number, // Include the 'amount' field here to store the order amount
            status: String,
            created: Date,
            currency: String,
        },
        orderStatus: {
            type: String,
            default: "Not Processed",
            enum: [
                "Not Processed",
                "Cash on Delivery",
                "Processing",
                "Dispatched",
                "Cancelled",
                "Delivered",
            ],
        },
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

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;