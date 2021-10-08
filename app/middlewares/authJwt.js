const jwt = require("jsonwebtoken");
const config = require("../config");
const db = require("../models");
const { AUTH } = require("../utils/constants");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: AUTH.NO_TOKEN,
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: AUTH.NOT_AUTHORIZED,
            });
        }
        console.log("decoded", decoded);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

const authJwt = {
    verifyToken,
};
module.exports = authJwt;
