const mongoose = require("mongoose");

const OrderTracking = mongoose.model(
    "OrderTracking",
    new mongoose.Schema({
            orderTrackingId: {type: String, required: true},
            orderId: {type: String, required: true},
            orderStatusId: {type: String, required: true},
            deliveryDate: Date,
            createdDate: { type: Date, default: Date.now() },
            updatedDate: { type: Date, default: Date.now() }
    })
);

module.exports = OrderTracking;