const { authJwt } = require("../middlewares");
const { event } = require("../middlewares");
const controller = require("../controllers/event.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.put(
    "/.netlify/functions/api/event",
    [authJwt.verifyToken, event.createValidateData],
    controller.createupdateEvent
  );
  app.get(
    "/.netlify/functions/api/event",
    [authJwt.verifyToken],
    controller.getEvents
  );
  app.delete(
    "/.netlify/functions/api/event",
    [authJwt.verifyToken, event.deleteValidateData],
    controller.deleteEvent
  );
};
