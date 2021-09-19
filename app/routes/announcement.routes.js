const { authJwt } = require("../middlewares");
const { announcement } = require("../middlewares");
const controller = require("../controllers/announcement.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.put(
        "/.netlify/functions/api/announcement",
        [authJwt.verifyToken, announcement.createValidateData],
        controller.createAnnouncement
    );
    app.get(
        "/.netlify/functions/api/announcement",
        [authJwt.verifyToken],
        controller.getAnnouncement
    );
};
