const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
});

const orderClass = mongoose.model('orders', orderSchema);

module.exports = orderClass;