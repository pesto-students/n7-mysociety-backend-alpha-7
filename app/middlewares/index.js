const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const announcement = require("./announcement");
const event = require("./events");
const complaint = require("./complaint");
const gallery = require("./gallery");
const upload = require("./upload");
module.exports = {
  authJwt,
  verifySignUp,
  announcement,
  complaint,
  event,
  gallery,
  upload,
};
