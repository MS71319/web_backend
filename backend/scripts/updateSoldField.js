const mongoose = require('mongoose');
const Product = require("../models/productModel");

mongoose.connect('mongodb+srv://maheshetikala2602:MS75453%40mongoose@cluster0.azw7aup.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

Product.updateMany(
    { sold: { $type: 'string' } }, // Find documents where 'sold' is of type string
    [{ $set: { sold: { $toDecimal: '$sold' } } }] // Convert 'sold' field to number using $toDecimal aggregation operator
)
    .then(result => {
        console.log(`${result.modifiedCount} products updated.`);
    })
    .catch(error => {
        console.error(error);
    });