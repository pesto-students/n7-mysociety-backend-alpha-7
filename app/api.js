const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const db = require("./models");
const config = require("./config");
const app = express();

var corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
console.log(config.mongoURI, "config.mongoURI");
db.mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/.netlify/functions/api/test", (req, res) => {
    res.json({ message: "Welcome to MySociety application." });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    // return data for 404
    res.status(404).send({ message: "Something went wrong! Error: 404" });
});
/*
// set port, listen for requests
const PORT = process.env.PORT || 9005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});*/

module.exports = app;
module.exports.handler = serverless(app);
