const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderStatusSchema = new Schema({
    orderStatusId: {type: String, required: true},
    name: {type: String, required: true},
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: Date.now() }
});

const orderStatusClass = mongoose.model('orderStatus', orderStatusSchema);

module.exports = orderStatusClass;