const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    roleId: {type: String, required: true},
    name: String,
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: Date.now() }
});

const roleClass = mongoose.model('roles', roleSchema);

module.exports = roleClass;