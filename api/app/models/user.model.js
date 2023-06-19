const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        userId: {type: String, required: true},
        pseudo: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        gender: String,
        firstname: String,
        surname: String,
        location: {
            address: String,
            zipCode: String,
            city: String,
            country: String
        },
        phoneNumber: String,
        birthDate: Date,
        createdDate: { type: Date, default: Date.now() },
        updatedDate: { type: Date, default: Date.now() }
    })
);

module.exports = User;