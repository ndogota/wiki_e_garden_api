const db = require("../models");
const plantFeatures = db.plantFeatures;
const Plant = db.plant;


exports.allPlants = (req, res) => {
    Plant.find({}, function (err, plants) {
        if (err) {
            console.log(err);
            res.status(500).send("Une erreur s'est produite lors de la recherche des plantes.");
        } else {
            plantFeatures.find({}, function (err, features) {
                if (err) {
                    console.log(err);
                    res.status(200).send([]);
                } else {
                    //console.log(features);
                    //console.log(plants);

                    plants = plants.map(plant => {
                        const featurePlant = Object.entries(plant.attributes.features);
                        let newFeaturePlant = [];
                        featurePlant.forEach(([featurePlantId, featurePlantValue]) => {
                            const feature = features.find(feature => feature.plantFeatureId == featurePlantId);
                            newFeaturePlant.push({
                                "plantFeatureName": feature.plantFeatureName,
                                "values": {
                                    [featurePlantValue]: feature.values[featurePlantValue]
                                }
                            });
                        });
                        plant.attributes.features = newFeaturePlant;
                        return plant;
                    });

                    res.status(200).json({plants: plants});
                }
            });
        }
    });
};


exports.createPlant = (req, res) => {
    const plant = new Plant({
        plantId: req.body.plantId,
        attributes: {
            name: req.body.name,
            description: req.body.attributes.description,
            imageUrl: req.body.attributes.imageUrl,
            plantationDate: req.body.plantationDate,
            harvestDate: req.body.harvestDate,
        },
    });


    plant.save((err, doc) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        res.send({message: "Plant data was registered successfully!"});
    });
}
exports.getPlantByName = (req, res) => {
    const keyword = req.query.name; // Chaîne à rechercher dans le nom des plantes

    Plant.find({ name: { $regex: keyword, $options: "i" } }, (err, plants) => {
        if (err) {
            console.log(err);
            res.status(500).send("Une erreur s'est produite lors de la recherche des plantes.");
        } else {
            if (plants.length === 0) {
                res.status(200).send([]);
            } else {
                plantFeatures.find({}, (err, features) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Une erreur s'est produite lors de la recherche des fonctionnalités des plantes.");
                    } else {
                        const updatedPlants = plants.map(plant => {
                            const featurePlant = Object.entries(plant.attributes.features);
                            let newFeaturePlant = [];
                            featurePlant.forEach(([featurePlantId, featurePlantValue]) => {
                                const feature = features.find(feature => feature.plantFeatureId == featurePlantId);
                                newFeaturePlant.push({
                                    "plantFeatureName": feature.plantFeatureName,
                                    "values": {
                                        [featurePlantValue]: feature.values[featurePlantValue]
                                    }
                                });
                            });
                            plant.attributes.features = newFeaturePlant;

                            return plant;
                        });

                        res.status(200).json({ plants: updatedPlants });
                    }
                });
            }
        }
    });
};

exports.getPlantById = (req, res) => {
    const keyword = req.query.id; // Chaîne à rechercher dans le nom des plantes

    Plant.find({ plantId: keyword}, (err, plants) => {
        if (err) {
            console.log(err);
            res.status(500).send("Une erreur s'est produite lors de la recherche des plantes.");
        } else {
            if (plants.length === 0) {
                res.status(200).send([]);
            } else {
                plantFeatures.find({}, (err, features) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Une erreur s'est produite lors de la recherche des fonctionnalités des plantes.");
                    } else {
                        const updatedPlants = plants.map(plant => {
                            const featurePlant = Object.entries(plant.attributes.features);
                            let newFeaturePlant = [];
                            featurePlant.forEach(([featurePlantId, featurePlantValue]) => {
                                const feature = features.find(feature => feature.plantFeatureId == featurePlantId);
                                newFeaturePlant.push({
                                    "plantFeatureName": feature.plantFeatureName,
                                    "values": {
                                        [featurePlantValue]: feature.values[featurePlantValue]
                                    }
                                });
                            });
                            plant.attributes.features = newFeaturePlant;

                            return plant;
                        });

                        res.status(200).json({ plants: updatedPlants });
                    }
                });
            }
        }
    });
};
