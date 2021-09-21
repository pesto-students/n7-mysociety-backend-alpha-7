const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.society = require("./society.model");
db.announcement = require("./announcement.model");
db.complaint = require("./complaint.model");
module.exports = db;
