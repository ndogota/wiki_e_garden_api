const mongoose = require("mongoose");

const Cart = mongoose.model(
    "Cart",
    new mongoose.Schema({
        cartId: {type: String, required: true},
        orderId: {type: String, required: true},
        userId: {type: String, required: true},
        discountId: String,
        totalPrice: String,
        productsList: [],
        productsNumber: Number,
        createdDate: { type: Date, default: Date.now() },
        updatedDate: { type: Date, default: Date.now() }
    })
);

module.exports = Cart;