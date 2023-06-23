const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountSchema = new Schema({
    discountId: {type: String, required: true},
    name: {type: String, required: true},
    code: String,
    amount: Number,
    stock: Number,
    usedNumber: Number,
    percentage: String,
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: Date.now() }
});

const discountClass = mongoose.model('discounts', discountSchema);

module.exports = discountClass;