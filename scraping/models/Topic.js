const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    topicId: {type: String, required: true},
    postId: String,
    name: {type: String, required: true},
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: Date.now() }
});

const topicClass = mongoose.model('topics', topicSchema);

module.exports = topicClass;