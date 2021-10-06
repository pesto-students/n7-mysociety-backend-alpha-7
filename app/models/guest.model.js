const mongoose = require("mongoose");

const Guest = mongoose.model(
    "Guest",
    new mongoose.Schema({
        adminEmail: String,
        adminPass: String,
        memberEmail: String,
        memberPass: String,
        active: Boolean,
    })
);

module.exports = Guest;
