const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        mobile: String,
        societyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Society",
        },
        flatId: String,
        role: String,
        password: String,
        isConfirmed: Boolean,
        isActive: Boolean,
    })
);

module.exports = User;
