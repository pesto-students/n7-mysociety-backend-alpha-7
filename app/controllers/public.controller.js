const db = require("../models");
const Society = db.society;

exports.getAllSociety = async (req, res) => {
    try {
        const findResult = await Society.find({}, { name: 1 });
        if (findResult) {
            res.status(200).send({
                message: "Society Data.",
                results: findResult,
            });
            return;
        } else {
            res.status(403).send({
                message: "Society Data not available.",
            });
            return;
        }
    } catch (err) {
        res.status(500).send({
            message: "Something is wrong please try again.",
        });
        return;
    }
};
