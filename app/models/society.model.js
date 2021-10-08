const mongoose = require("mongoose");

const Society = mongoose.model(
    "Society",
    new mongoose.Schema({
        name: String,
        societyEmail: String,
        address: String,
        mobile: String,
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isEmailConfirmed: Boolean,
    })
);

module.exports = Society;
