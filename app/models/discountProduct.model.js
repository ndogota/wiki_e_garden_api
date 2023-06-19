const mongoose = require("mongoose");

const DiscountProduct = mongoose.model(
    "DiscountProduct",
    new mongoose.Schema({
        discountProductId: {type: String, required: true},
        name: {type: String, required: true},
        amount: String,
        quantity: String,
        usedNumber: Number,
        percentage: String,
        createdDate: { type: Date, default: Date.now() },
        updatedDate: { type: Date, default: Date.now() }
    })
);

module.exports = DiscountProduct;