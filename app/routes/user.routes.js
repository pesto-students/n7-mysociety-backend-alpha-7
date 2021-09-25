const { authJwt } = require("../middlewares");
const controller = require("../controllers/public.controller");
const userController = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/.netlify/functions/api/get-all-society",
        controller.getAllSociety
    );

    app.get(
        "/.netlify/functions/api/user",
        [authJwt.verifyToken],
        userController.getUser
    );

    app.put(
        "/.netlify/functions/api/user",
        [authJwt.verifyToken],
        userController.updateUser
    );
};
