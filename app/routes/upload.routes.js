const { authJwt } = require("../middlewares");
const controller = require("../controllers/upload.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/.netlify/functions/api/multipe-upload",
    [authJwt.verifyToken],
    controller.uploadFiles
  );

  app.post(
    "/.netlify/functions/api/single-upload",
    [authJwt.verifyToken],
    controller.uploadFile
  );
};
