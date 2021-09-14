const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    mongoURI: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kkoed.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
};
