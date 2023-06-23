const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.topics = require("./topics.model");

db.cart = require("./cart.model");
db.comment = require("./comment.model");
db.discount = require("./discount.model");
db.discountProduct = require("./discountProduct.model");
db.order = require("./order.model");
db.orderStatus = require("./orderStatus.model");
db.orderTracking = require("./orderTracking.model");
db.plant = require("./plant.model");
db.plantConfig = require("./plantConfig.model");
db.post = require("./post.model");
db.product = require("./product.model");
db.plantFeatures = require("./plantFeatures.js");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;