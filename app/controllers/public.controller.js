const db = require("../models");
const Society = db.society;
const Guest = db.guest;
const { PUBLIC, COMMON } = require("../utils/constants");

exports.getAllSociety = async (req, res) => {
    try {
        const findResult = await Society.find({}, { name: 1 });
        if (findResult) {
            res.status(200).send({
                message: PUBLIC.ALL_SOCIETY_DATA,
                results: findResult,
            });
            return;
        } else {
            res.status(403).send({
                message: PUBLIC.SOCIETY_DATA_NOT_AVAILABLE,
            });
            return;
        }
    } catch (err) {
        res.status(500).send({
            message: COMMON.SOMETHING_WRONG,
        });
        return;
    }
};
exports.getGuestLogin = async (req, res) => {
    try {
        const findResult = await Guest.find({});
        if (findResult) {
            res.status(200).send({
                message: PUBLIC.GUEST_DATA,
                results: findResult,
            });
            return;
        } else {
            res.status(403).send({
                message: PUBLIC.GUEST_DATA_NOT_AVAILABLE,
            });
            return;
        }
    } catch (err) {
        res.status(500).send({
            message: COMMON.SOMETHING_WRONG,
        });
        return;
    }
};
