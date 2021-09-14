const config = require("../config/auth.config");
const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = db.user;

exports.signup = (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            societyId: req.body.societyId,
            flatId: req.body.flatId,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        user.save((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send({ message: "User register successfully. " });
            return;
        });
    } catch (err) {
        res.status(500).send({
            message: "Something is wrong please try again.",
        });
        return;
    }
};

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });

        res.header("x-auth-token", token);
        res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    });
};
