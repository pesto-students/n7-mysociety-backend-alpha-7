const config = require("../config/auth.config");
const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const User = db.user;
const Society = db.society;
const { authJwt } = require("../middlewares");
const EmailController = require("./email");
const createSociety = function (req) {
    try {
        return Society.create(req).then((docSociety) => {
            console.log("\n>> Created Society:\n", docSociety);
            return docSociety;
        });
    } catch (err) {
        return false;
    }
};

const updateAdminInSociety = function (societyId, user) {
    try {
        return Society.findByIdAndUpdate(
            societyId,
            { $push: { admin: user._id } },
            { new: true, useFindAndModify: false }
        );
    } catch (err) {
        return false;
    }
};
exports.signup = async (req, res) => {
    try {
        var docSociety;
        if (req.body.role === "admin") {
            docSociety = await createSociety({
                name: req.body.societyName,
                societyEmail: req.body.email,
                address: req.body.societyAddress,
                isEmailConfirmed: true,
            });
            if (!docSociety) {
                res.status(500).send({
                    message: "Something is wrong please try again.",
                    error: "Can't able to create society.",
                });
                return;
            }
        }

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile,
            societyId:
                req.body.role === "admin" ? docSociety._id : req.body.societyId,
            flatId: req.body?.flatId,
            role: req.body.role,
            password: bcrypt.hashSync(req.body.password, 8),
            isConfirmed: true,
            isActive: true,
        });

        user.save(async (err, user) => {
            if (err) {
                res.status(500).send({ message1: err });
                return;
            }
            if (req.body.role === "admin") {
                const update = await updateAdminInSociety(docSociety._id, user);
            }
            const emailBody = await EmailController.getHtml("default", {
                body: "Thank you for joining the MySociety. Now you can access the MySociety dashboard and involve in day to day society activity.",
            });
            const mailOption = {
                from: '"MySociety " <team.ninja.alpha7@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: "Welcome to MySociety", // Subject line
                html: emailBody, // html body
            };
            const sendMail = await EmailController.sendEmail(mailOption);
            res.status(200).send({
                message: "User register successfully.",
                sendMail: sendMail,
            });
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
                message: "Invalid Password!",
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });

        res.header("x-auth-token", token);
        const userDate = _.pick(user, [
            "_id",
            "firstName",
            "lastName",
            "email",
            "societyName",
            "societyAddress",
            "gender",
            "profilePic",
            "role",
        ]);
        res.status(200).send(userDate);
    });
};
