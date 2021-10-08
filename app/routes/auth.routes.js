const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/.netlify/functions/api/auth/signup",
        [verifySignUp.validateData, verifySignUp.checkExistingUserEmail],
        controller.signup
    );

    app.post("/.netlify/functions/api/auth/signin", controller.signin);

    app.post(
        "/.netlify/functions/api/auth/forget-password",
        controller.forgetPassword
    );

    app.post(
        "/.netlify/functions/api/auth/reset-password",
        controller.resetPassword
    );

    app.post(
        "/.netlify/functions/api/auth/verify-society",
        controller.verifySociety
    );
};
