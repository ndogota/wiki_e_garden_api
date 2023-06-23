const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentId: {type: String, required: true},
    postId: {type: String, required: true},
    userId: {type: String, required: true},
    likesNumber: Number,
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: Date.now() }
});

const commentClass = mongoose.model('comments', commentSchema);

module.exports = commentClass;