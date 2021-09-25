const config = require("../config");
const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const User = db.user;
const Society = db.society;
const EmailController = require("./email");
const { AUTH, COMMON } = require("../utils/constants");

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
            { admin: user._id },
            { new: false, useFindAndModify: true }
        );
    } catch (err) {
        return false;
    }
};

const getSociety = function (user) {
    try {
        return Society.findById(user.societyId).then((docSociety) => {
            console.log("\n>> Get Society:\n", docSociety);
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
                    message: COMMON.SOMETHING_WRONG,
                    error: AUTH.SIGNUP.CAN_NOT_CREATE_SOCIETY,
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
            isConfirmed: false,
            isActive: true,
        });

        user.save(async (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
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
                message: AUTH.SIGNUP.USER_REGISTERED,
                sendMail: sendMail,
            });
            return;
        });
    } catch (err) {
        res.status(500).send({
            message: COMMON.SOMETHING_WRONG,
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
                return res
                    .status(404)
                    .send({ message: AUTH.SIGNIN.USER_NOT_FOUND });
            }
            var passwordIsValid = bcrypt.compareSync(password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: AUTH.SIGNIN.INVALID_PASSWORD,
                });
            }

            if (!user?.isConfirmed) {
                return res.status(403).send({
                    message: AUTH.SIGNIN.NOT_CONFIRMED,
                });
            } else if (!user?.isActive) {
                return res.status(403).send({
                    message: AUTH.SIGNIN.INACTIVE,
                });
            }

            var token = jwt.sign(
                { id: user._id, role: user.role },
                config.secret,
                {
                    expiresIn: 86400, // 24 hours
                }
            );

            res.header("x-auth-token", token);
            const userData = _.pick(user, [
                "_id",
                "firstName",
                "lastName",
                "email",
                "gender",
                "mobile",
                "flatNo",
                "profilePic",
                "role",
            ]);
            const societyData = await getSociety(user);
            if (!societyData) {
                res.status(403).send({
                    message: AUTH.SIGNIN.SOCIETY_NOT_FOUND,
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
            message: COMMON.SOMETHING_WRONG,
            error: err,
        });
        return;
    }
};
