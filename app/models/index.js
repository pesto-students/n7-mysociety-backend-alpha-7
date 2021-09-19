const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.society = require("./society.model");
db.announcement = require("./announcement.model");
module.exports = db;
