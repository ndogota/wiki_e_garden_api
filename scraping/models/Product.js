const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId: {type: String, required: true},
    discountProductId: {type: String, required: true},
    name: {type: String, required: true},
    price: String,
    stock: Number,
    size: String,
    color: String,
    description: String,
    rate: Number,
    image: String,
    productState: String,
    vat: String,
    priceWithoutTax: String,
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: Date.now() }
});

const productClass = mongoose.model('products', productSchema);

module.exports = productClass;