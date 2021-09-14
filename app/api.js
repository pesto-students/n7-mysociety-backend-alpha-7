const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const cors = require("cors");
const db = require("./models");
const dbConfig = require("./config/db.config");
const app = express();

var corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

db.mongoose
    .connect(dbConfig.mongoURI, {
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

// set port, listen for requests
const PORT = process.env.PORT || 9005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
module.exports.handler = serverless(app);
