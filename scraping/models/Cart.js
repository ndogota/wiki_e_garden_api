const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    cartId: {type: String, required: true},
    orderId: {type: String, required: true},
    userId: {type: String, required: true},
    discountId: String,
    totalPrice: String,
    productsList: [],
    productsNumber: Number,
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: Date.now() }
});

const cartClass = mongoose.model('carts', cartSchema);

module.exports = cartClass;