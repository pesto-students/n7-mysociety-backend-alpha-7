const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "Something is wrong!",
            error: "No token provided!",
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "You are not authorized to use our service!!",
            });
        }
        req.userId = decoded.id;
        next();
    });
};

test = (req, res, next) => {
    console.log("test is run");
    next();
};

const authJwt = {
    verifyToken,
    test,
};
module.exports = authJwt;
