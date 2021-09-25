const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.society = require("./society.model");
db.announcement = require("./announcement.model");
db.event = require("./event.model");
db.complaint = require("./complaint.model");
db.gallery = require("./gallery.model");
db.faqs = require("./faq.model");
module.exports = db;
