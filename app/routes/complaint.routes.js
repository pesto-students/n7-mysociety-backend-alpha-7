const { authJwt } = require("../middlewares");
const { complaint } = require("../middlewares");
const controller = require("../controllers/complaint.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.put(
        "/.netlify/functions/api/complaint",
        [authJwt.verifyToken, complaint.createValidateData],
        controller.createUpdateComplaint
    );

    app.get(
        "/.netlify/functions/api/complaint",
        [authJwt.verifyToken],
        controller.getComplaint
    );
};
