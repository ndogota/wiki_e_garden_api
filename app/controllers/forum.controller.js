const db = require("../models");

exports.allTopics = (req, res) => {
    db.topics.find({}, function(err, topics) {
        if(err) {
            console.log(err);
        } else {
            res.json(topics);
        }
    })
};