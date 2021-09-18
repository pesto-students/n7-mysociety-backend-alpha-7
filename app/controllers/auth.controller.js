const config = require("../config");
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

const getSociety = function (user) {
    try {
        return Society.findById(user.societyId).then((docSociety) => {
            console.log("\n>> Created Society:\n", docSociety);
            return docSociety;
        });
    } catch (err) {
        return false;
    }
};
exports.signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            mobile,
            societyId,
            role,
            societyName,
            societyAddress,
            password,
            flatNo,
        } = req.body;
        var docSociety;
        if (role === "admin") {
            docSociety = await createSociety({
                name: societyName,
                societyEmail: email,
                address: societyAddress,
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
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            societyId: role === "admin" ? docSociety._id : societyId,
            flatNo: flatNo,
            role: role,
            password: bcrypt.hashSync(password, 8),
            isConfirmed: true,
            isActive: true,
        });

        user.save(async (err, user) => {
            if (err) {
                res.status(500).send({ message1: err });
                return;
            }
            if (role === "admin") {
                const update = await updateAdminInSociety(docSociety._id, user);
            }
            const emailBody = await EmailController.getHtml("default", {
                body: "Thank you for joining the MySociety. Now you can access the MySociety dashboard and involve in day to day society activity.",
            });
            const mailOption = {
                from: '"MySociety " <team.ninja.alpha7@gmail.com>', // sender address
                to: email, // list of receivers
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

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        User.findOne({
            email: email,
        }).exec(async (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password!",
                });
            }

            if (!user?.isConfirmed) {
                return res.status(403).send({
                    message:
                        "You are not verified yet by society admin. Contact society admin for more details.",
                });
            } else if (!user?.isActive) {
                return res.status(403).send({
                    message:
                        "You account is inactive. Contact society admin for more details.",
                });
            }

            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });

            res.header("x-auth-token", token);
            const userData = _.pick(user, [
                "_id",
                "firstName",
                "lastName",
                "email",
                "gender",
                "profilePic",
                "role",
            ]);
            const societyData = await getSociety(user);
            if (!societyData) {
                res.status(403).send({
                    message: "Society data not found.",
                    error: err,
                });
                return;
            }
            userData.society = _.pick(societyData, [
                "_id",
                "name",
                "societyEmail",
                "address",
            ]);
            res.status(200).send(userData);
            return;
        });
    } catch (err) {
        res.status(500).send({
            message: "Something is wrong please try again.",
            error: err,
        });
        return;
    }
};
