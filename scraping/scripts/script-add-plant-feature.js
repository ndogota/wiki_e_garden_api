// import des packages nécessaires
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
// import des ressources nécessaires de configuration
const keys = require("../config/environment/keys");
const PlantFeature = require("../models/plant-feature.model");
const referencesList = require("../resources/referencesList.json");
const featuresInformationsUrl = keys.featuresInformationsUrl;

// fonction de connexion à la base de donneés
mongoose.connect(keys.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// fonction qui exécute une requête GET sur l'url fourni en paramètre
async function requestAPI(url) {
    const {data} = await axios.get(url);
    return cheerio.load(data);
}

// fonction qui récupère toutes les informations concernant les bulles informatives
function getFeaturesInformations(data) {
    const featuresInformationsList = [];
    referencesList.forEach(element => {
        switch (element.cssClassParagraph) {
            case "expo":
                featuresInformationsList.push(data(`#_voir_information_expo`).text().trim().split('\n').slice(4, 11).filter(str => str !== ''));
                break;
            case "ph":
            case "insecte":
                featuresInformationsList.push(data(`#_voir_information_${element.cssClassParagraph}`).text().trim().split('\n').slice(2, 5));
                break;
            case "besoin":
                featuresInformationsList.push(data(`#_voir_information_${element.cssClassParagraph}`).text().trim().split('\n').slice(3, 6));
                break;
            case "entretien":
            case "croissance":
            case "resist":
                featuresInformationsList.push(data(`#_voir_information_${element.cssClassParagraph}`).text().trim().split('\n').slice(1, 4));
                break;
            default:
                featuresInformationsList.push(data(`#_voir_information_${element.cssClassParagraph}`).text().trim().split('\n').slice(1, 6));
        }
    });
    return featuresInformationsList;
}

// fonction qui scrape les données pertinentes et enregistre les données scrapées en base de données
async function addPlantFeaturesInDatabase() {
    const featureLink = `${featuresInformationsUrl.featuresInformationsUrl}`;
    const responseFeaturesValues = await requestAPI(featureLink);

    const features = getFeaturesInformations(responseFeaturesValues);

    for (let i = 0; i < referencesList.length; i++) {
        const result = {};

        for (let j = 0; j < 3; j++) {
            const key = features[i][j].split(':')[0].trim();
            result[key] = features[i][j].split(':')[1].trim();
        }
        const plantFeature = new PlantFeature({
            plantFeatureId: i + 1,
            plantFeatureName: referencesList[i].typeName,
            values: result
        });
        await plantFeature.save();
    }

    const plantFeatures = await PlantFeature.find();
    console.log(plantFeatures);
}

addPlantFeaturesInDatabase().then(process.exit);