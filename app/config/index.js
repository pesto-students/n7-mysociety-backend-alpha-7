const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    secret: process.env.JWT_PRIVATE_KEY,
    mongoURI: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@myscoietycluster.9jin1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
};
