const mongoose = require("mongoose");

const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
            commentId: {type: String, required: true},
            postId: {type: String, required: true},
            userId: {type: String, required: true},
            likesNumber: Number,
            createdDate: { type: Date, default: Date.now() },
            updatedDate: { type: Date, default: Date.now() }
    })
);

module.exports = Comment;