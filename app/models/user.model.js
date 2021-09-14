const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        name: String,
        email: String,
        mobile: String,
        societyId: String,
        flatId: String,
        password: String,
    })
);

module.exports = User;
