const mongoose = require("mongoose");

const Post = mongoose.model(
    "Post",
    new mongoose.Schema({
        postId: {type: String, required: true},
        userId: {type: String, required: true},
        topicId: {type: String, required: true},
        viewsNumber: Number,
        commentsNumber: Number,
        title: String,
        description: String,
        likesNumber: Number,
        createdDate: { type: Date, default: Date.now() },
        updatedDate: { type: Date, default: Date.now() }
    })
);

module.exports = Post;