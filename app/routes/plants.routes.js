const { authJwt } = require("../middlewares");
const controller = require("../controllers/plants.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/plants", controller.allPlants);

    app.post("/createplant", controller.createPlant);
};
