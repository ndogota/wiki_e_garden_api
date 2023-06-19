const mongoose = require("mongoose");

const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        name: String,
        createdDate: { type: Date, default: Date.now() },
        updatedDate: { type: Date, default: Date.now() }
    })
);

module.exports = Role;