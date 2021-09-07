const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

const users = require("./rouets/api/users");

const app = express();

//BodyParser init
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
//DB config
const db = require("./config/keys").mongoURI;

//connect mongodb

mongoose
    .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("Mongodb connected...."))
    .catch((err) => console.log(err));

app.use(`/.netlify/functions/api/test`, users);

module.exports = app;
module.exports.handler = serverless(app);
