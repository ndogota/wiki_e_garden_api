const mongoose = require("mongoose");

const Plant = mongoose.model(
    "Plant",
    new mongoose.Schema({
        name: {type: String, required: true},
        description: {type: String, required: true},
        image: {type: String, required: true},
        typePlant: String,
        besoinEau: String,
        expositionSoleil: String,
        niveauEntretien: String,
        antiInsecte: String,
        niveauPh: String,
        plantationDate: [],
        recolteDate: [],
        createdDate: { type: Date, default: Date.now() },
        updatedDate: { type: Date, default: Date.now() }
    })
);

module.exports = Plant;