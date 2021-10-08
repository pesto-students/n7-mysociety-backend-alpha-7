const { authJwt } = require("../middlewares");
const { gallery, upload } = require("../middlewares");
const controller = require("../controllers/gallery.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.put(
    "/.netlify/functions/api/gallery",
    [authJwt.verifyToken, gallery.createValidateData],
    controller.createGallery
  );
  app.get(
    "/.netlify/functions/api/gallery",
    [authJwt.verifyToken],
    controller.getGallery
  );
  app.delete(
    "/.netlify/functions/api/gallery",
    [authJwt.verifyToken, gallery.deleteValidateData],
    controller.deleteGallery
  );
};
