const { authJwt } = require("../middlewares");
const controller = require("../controllers/faq.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.put("/.netlify/functions/api/faqs", controller.createFaq);
  app.get("/.netlify/functions/api/faqs", controller.getFaqs);
  app.delete("/.netlify/functions/api/faqs", controller.deleteFaq);
};
