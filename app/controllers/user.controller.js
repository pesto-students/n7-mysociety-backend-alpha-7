const config = require("../config");
const db = require("../models");
const _ = require("lodash");
const User = db.user;
const EmailController = require("./email");
const utils = require("../utils/functions");
const { COMMON, USER, SETTINGS, AUTH } = require("../utils/constants");

exports.updateUser = async (req, res) => {
    try {
        const { userId, userRole } = req;
        const { _id, societyId, status } = req.body;

        const filter = { societyId: societyId };
        if (_id) {
            filter._id = _id;
        } else {
            filter._id = userId;
        }
        let update = _.pick(req.body, [
            "firstName",
            "lastName",
            "flatNo",
            "gender",
            "mobile",
        ]);
        if (userRole === "admin" && status) {
            if (status === "accept") {
                update.isConfirmed = true;
            } else if (status === "deactivate") {
                update.isActive = false;
            } else if (status === "activate") {
                update.isActive = true;
            }
        }
        if (update !== null) {
            User.findOneAndUpdate(
                filter,
                update,
                {
                    new: true,
                },
                (err, result) => {
                    if (err) {
                        res.status(500).send({
                            message: COMMON.SOMETHING_WRONG,
                            error: err,
                        });
                        return;
                    }

                    res.status(203).send({
                        message: USER.UPDATED,
                        result: result,
                    });
                    return;
                }
            );
        } else {
            res.status(400).send({
                message: USER.SOMETHING_MISSING,
            });
            return;
        }
    } catch (err) {
        console.log(err, "err");
        res.status(500).send({
            message: COMMON.SOMETHING_WRONG,
        });
        return;
    }
};

exports.getUser = async (req, res) => {
    try {
        const { userId, userRole } = req;
        const {
            societyId,
            page = 1,
            limit = SETTINGS.DEFAULT_PAGE_LIMIT,
            isActive,
            isConfirmed,
            getAll,
        } = req.query;
        const options = {
            page: page,
            limit: limit,
            sort: { created_at: -1 },
        };
        let query = {};
        if (societyId) {
            query.societyId = societyId;
        }
        if (getAll) {
            if (isActive) {
                query.isActive = isActive;
            }
            if (isConfirmed) {
                query.isConfirmed = isConfirmed;
            }
            query.role = "member";
            User.paginate(query, options, function (err, result) {
                if (err) {
                    res.status(403).send({
                        message: USER.NOT_FOUND,
                    });
                    return;
                }

                res.status(200).send({
                    message: USER.ALL_FOUND,
                    result: result,
                });
                return;
            });
        } else {
            query._id = userId;
            User.find(query, {}, async (err, result) => {
                if (err) {
                    res.status(403).send({
                        message: USER.NOT_FOUND,
                    });
                    return;
                }

                const userData = _.pick(result[0], [
                    "firstName",
                    "lastName",
                    "email",
                    "gender",
                    "mobile",
                    "flatNo",
                    "profilePic",
                ]);
                const societyData = await utils.getSociety({
                    societyId: societyId,
                });
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
                res.status(200).send({
                    message: USER.FOUND,
                    result: userData,
                });
                return;
            });
        }
    } catch (err) {
        res.status(500).send({
            message: COMMON.SOMETHING_WRONG,
        });
        return;
    }
};
