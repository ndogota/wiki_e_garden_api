const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountProductSchema = new Schema({
    discountProductId: {type: String, required: true},
    name: {type: String, required: true},
    amount: String,
    quantity: String,
    usedNumber: Number,
    percentage: String,
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: Date.now() }
});

const discountProductClass = mongoose.model('discountsProduct', discountProductSchema);

module.exports = discountProductClass;