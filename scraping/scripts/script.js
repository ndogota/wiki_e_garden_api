// importer les deux librairies nécessaires au scraping de données
const axios = require("axios");
const cheerio = require("cheerio");

// importer librairie pour la base de données
const mongoose = require("mongoose");
const Plant = require('../models/plant.model');
const PlantFeature = require("../models/plant-feature.model");
const keys = require("../config/environment/keys");

// importer les deux fichiers JSON contenant les catégories
const referencesList = require("../resources/referencesList.json");
const jsonDataInfos = require('../resources/infos.json');

// importer le fichier JavaScript contenant l'URL du site où l'on va scraper les informations sur les catégories
const featuresUrl = keys.featuresInformationsUrl;


// importer le fichier JSON contenant les mois de l'année
const months = require("../resources/months.json");


// fonction de connexion à la base de donneés
mongoose.connect(keys.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// stocker l'ensemble des valeurs possibles de toutes les catégories dans un objet contenant des tableaux de données
const arrayListValues = {
    "Entretien": [],
    "Besoin en eau": [],
    "Croissance": [],
    "Resistance au froid": [],
    "PH du sol": [],
    "Anti-insectes": [],
    "Exposition": [],
};

// fonction qui va permettre de récupérer toutes les informations relatives aux différentes catégories et les différentes valeurs possibles
function getValues(data) {
    referencesList.forEach(element => {
        const array = data(`#${element.cssClassLabel} label`).text().split("\n");

        const split = data(`#_voir_information_${element.cssClassParagraph} p`).text().split("\n").toString();
        const modalInfo = split.substring(split.indexOf('?') + 1);

        arrayListValues[`${element.typeName}`].push(array.filter(e => e), modalInfo);
    });
    }

// fonction qui permet de récupérer les dates de plantation de chaque plante ou légume
function getPlantationDate(data) {
    const plantationDateList = [];
    const plantationDate = data(`td._selected1`).text();
    for (let i = 0; i < months.length; i++) {
        if (plantationDate.includes(months[i])) {
            plantationDateList.push(months[i]);
        }
    }
    return plantationDateList;
}

// fonction qui permet de récupérer les dates de récolte de  chaque plante ou légume
function getHarvestDate(data) {
    const harvestDateList = [];
    const harvestDate = data(`td._selected3`).text();
    for (let i = 0; i < months.length; i++) {
        if (harvestDate.includes(months[i])) {
            harvestDateList.push(months[i]);
        }
    }
    return harvestDateList;
}

// fonction permettant de récupérer toutes les URLs des plantes ciblées provenant d'un fichier JSON et les retourner
function getUrls() {
    const urls = [];

    for (let plant of jsonDataInfos.plants) {
        urls.push(plant.urlScraping);
    }
    return urls;
}

// fonction qui récupère les informations principales d'une plante
async function getMainInfo(data) {
        const nomPlante = data("#fiches_plantes h1").html();
        const descriptionPlante = data("#images_plante p").html();
        const imagePlante = data(".img_selected a").find('img').attr('src');

        return [nomPlante, descriptionPlante, imagePlante];
}

// fonction qui récupère toutes les valeurs possibles sur les catégories
function getAllAvailableValues(data) {
    getValues(data);

    const values = {};

    for (let key in arrayListValues) {
        const infos = arrayListValues[key];
        values[`${key}`] = `${infos[0]}`;
    }

    const array = [];
    array.push(Object.values(values).join().split(','));

    const flat = array.flat().flat();

    if (flat.includes('Mouches blanches')) {
        const index = array.flat().indexOf('Mouches blanches');
        array.splice(index, 1, 'Mouches');
    }
    return array.flat().flat();
}

// fonction qui récupère toutes les informations détaillées d'une plante
function getAllDetailedData(detailedData, availableValues) {
    const infos = detailedData(".bulle_info2").text();
    const results = [];

    for (let i = 0; i < availableValues.length; i++) {
        if (infos.includes(availableValues[i])) {
            results.push(availableValues[i]);
        }
    }
    return results;
}

// fonction qui récupère les informations sur le pH d'une plante
function getPH(detailedData) {
    const allPHValues = ["acide", "neutre", "alcalin"];
    const infos = detailedData(".bulle_info2").text();
    const results = [];

    for (let i = 0; i < allPHValues.length; i++) {
        if (infos.includes(allPHValues[i])) {
            results.push(`Sol ${allPHValues[i]}`);
        }
    }
    return results;
}

// fonction qui exécute une requête GET sur l'url fourni en paramètre
async function requestAPI(url) {
    const { data } = await axios.get(url);
    return cheerio.load(data);
}

// fonction qui appelle la table des features en base de données et retourne ses données
async function getFeatures() {
    const features = {};
    const plantFeatures = await PlantFeature.find();
    plantFeatures.forEach(feature => {
        features[feature.plantFeatureId] = feature.values;
    });
    return features;
}

// fonction qui scrape le site Ooreka pour remplir la base de données qui va servir de wiki plantes
async function scrapeData() {
    // url de récupération des features
    const linkFeatures = `${featuresUrl.featuresInformationsUrl}`;

    // appel de la fonction pour faire la requête de scraping pour les features
    const responseFeaturesValues = await requestAPI(linkFeatures);

    const allFeatures = await getFeatures();
    // console.log(allFeatures);

    for (const [index, url] of getUrls().entries()) {
        // appel de la fonction pour faire la requête de scraping pour les valeurs
        const responseDetailedInformations = await requestAPI(url);

        // l'ensemble des valeurs possibles
        const allAvailableValues = getAllAvailableValues(responseFeaturesValues);

        // valeurs finales sans pH
        const allDetailedData = getAllDetailedData(responseDetailedInformations, allAvailableValues).flat();

        // valeurs finales avec pH
        allDetailedData.push(getPH(responseDetailedInformations));
        const allData = allDetailedData.flat();

        // affiner le filtrage des données
        allData.forEach(function callback(value, index) {
            switch (value) {
                case "Résistante":
                    allData.splice(index, 1, 'Résistante (rustique)');
                    break;
                case "À protéger":
                    allData.splice(index, 1, 'À protéger (semi-rustique)');
                    break;
                case "À rentrer":
                    allData.splice(index, 1, 'À rentrer (fragile)');
                    break;
                case "Moustiques":
                    allData.splice(index, 1, 'Anti-moustiques');
                    break;
                case "Pucerons":
                    allData.splice(index, 1, 'Anti-pucerons');
                    break;
                case "Mouches":
                case "Limaces":
                case "Doryphores":
                    allData.splice(index, 1, 'Anti-mouches, anti-limaces et anti-doryphores');
                    break;
                default:
            }
        })

        // objet qui va stocker l'ensemble des données finales scrapées
        const result = {};

        // doubles boucles afin de filtrer les données
        for (let i = 0; i < allData.length; i++) {
            for (let j = 0; j < Object.keys(allFeatures).length; j++) {
                if (Object.keys(Object.values(allFeatures)[j]).includes(allData[i])) {
                    result[Number(Object.keys(allFeatures)[j])] = allData[i];
                }
            }
        }

        // appels des fonctions qui scrapent les données
        const data = await requestAPI(url);
        const mainInfo = await getMainInfo(data);

        const plantName = mainInfo[0];
        const plantDescription = mainInfo[1];
        const plantImageUrl = mainInfo[2];
        const plantationDates = getPlantationDate(data);
        const harvestDates = getHarvestDate(data);

        // ajout des plantes scrapées en base de données
        const plant = await new Plant({
            plantId: index + 1,
            name: plantName,
            attributes: {
                description: plantDescription,
                imageUrl: plantImageUrl,
                features: result,
                plantationDate: plantationDates,
                harvestDate: harvestDates,
            }
        });
        await plant.save();
    }

    // appel à la base de données pour vérifier l'ajout des données scrapées
    // const plants = await Plant.find();
    // console.log(plants);
}

scrapeData().then(process.exit);