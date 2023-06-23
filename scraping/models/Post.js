const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
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
});

const postClass = mongoose.model('posts', postSchema);

module.exports = postClass;