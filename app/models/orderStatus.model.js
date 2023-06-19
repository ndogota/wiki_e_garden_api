const mongoose = require("mongoose");

const OrderStatus = mongoose.model(
    "OrderStatus",
    new mongoose.Schema({
            orderStatusId: {type: String, required: true},
            name: {type: String, required: true},
            createdDate: { type: Date, default: Date.now() },
            updatedDate: { type: Date, default: Date.now() }
    })
);

module.exports = OrderStatus;