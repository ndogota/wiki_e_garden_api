const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantConfigSchema = new Schema({
    plantConfigId: {type: String, required: true},
    path: String,
    version: String,
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: Date.now() }
});

const plantsConfigClass = mongoose.model('plantsConfig', plantConfigSchema);

module.exports = plantsConfigClass;