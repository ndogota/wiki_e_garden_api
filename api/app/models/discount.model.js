const mongoose = require("mongoose");

const Discount = mongoose.model(
    "Discount",
    new mongoose.Schema({
            discountId: {type: String, required: true},
            name: {type: String, required: true},
            code: String,
            amount: Number,
            stock: Number,
            usedNumber: Number,
            percentage: String,
            createdDate: { type: Date, default: Date.now() },
            updatedDate: { type: Date, default: Date.now() }
    })
);

module.exports = Discount;