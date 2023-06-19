const mongoose = require("mongoose");

const Topics = mongoose.model(
    "Topics",
    new mongoose.Schema({
        topicId: {type: String, required: true},
        postId: String,
        name: {type: String, required: true},
        createdDate: { type: Date, default: Date.now() },
        updatedDate: { type: Date, default: Date.now() }
    })
);

module.exports = Topics;