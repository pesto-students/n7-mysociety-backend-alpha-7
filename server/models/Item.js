const mongooes = require("mongoose");
const Schema = mongooes.Schema;

//Create  Schema

const ItemSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Item = mongooes.model("users", ItemSchema);
