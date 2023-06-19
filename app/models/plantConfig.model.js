const mongoose = require("mongoose");

const PlantConfig = mongoose.model(
    "PlantConfig",
    new mongoose.Schema({
        plantConfigId: {type: String, required: true},
        path: String,
        version: String,
        createdDate: { type: Date, default: Date.now() },
        updatedDate: { type: Date, default: Date.now() }
    })
);

module.exports = PlantConfig;