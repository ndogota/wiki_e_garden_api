const mongoose = require("mongoose");

const Order = mongoose.model(
    "Order",
    new mongoose.Schema({
        orderId: {type: String, required: true},
        userId: {type: String, required: true},
        discountId: String,
        productsId: [],
        priceWithoutTax: String,
        vat: String,
        price: String,
        quantity: Number,
        productsList: [],
        productsNumber: Number,
        status: String,
        createdDate: { type: Date, default: Date.now() },
        updatedDate: { type: Date, default: Date.now() }
    })
);

module.exports = Order;