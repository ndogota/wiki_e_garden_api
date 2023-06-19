const db = require("../models");

const Plant = db.plant;

exports.allPlants = (req, res) => {
    Plant.find({}, function(err, plants) {
        if(err) {
            console.log(err);
        } else {
            res.status(200).send(plants);
        }
    })
};

exports.createPlant = (req, res) => {
    const plant = new Plant({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    });

    plant.save((err, doc) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({ message: "Plant data was registered successfully!" });
    });
}
