const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderTrackingSchema = new Schema({
    orderTrackingId: {type: String, required: true},
    orderId: {type: String, required: true},
    orderStatusId: {type: String, required: true},
    deliveryDate: Date,
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: Date.now() }
});

const orderTrackingClass = mongoose.model('orderTracking', orderTrackingSchema);

module.exports = orderTrackingClass;