const config = require("../config");
const db = require("../models");
const _ = require("lodash");
const Announcement = db.announcement;
const User = db.user;
const EmailController = require("./email");
const utils = require("../utils");

exports.createUpdateAnnouncement = async (req, res) => {
    try {
        const { userId } = req;
        const { _id, title, desc, societyId } = req.body;

        if (_id) {
            const filter = _.pick(req.body, ["_id", "societyId"]);
            const update = _.pick(req.body, ["title", "desc"]);
            Announcement.findOneAndUpdate(
                filter,
                update,
                {
                    new: true,
                },
                (err, result) => {
                    if (err) {
                        res.status(500).send({
                            message: "Something want wrong please try again.",
                            error: err,
                        });
                        return;
                    }

                    res.status(203).send({
                        message: "Announcement updated successfully.",
                        result: result,
                    });
                    return;
                }
            );
        } else {
            const announcement = new Announcement({
                title: title,
                desc: desc,
                societyId: societyId,
                postedBy: userId,
            });

            announcement.save(async (err, record) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                const societyMembers = await utils.getSocietyMembers(societyId);
                const emailBody = await EmailController.getHtml("default", {
                    body: "New announcement is there in your society. Open MySociety app for more details.",
                });
                const mailOption = {
                    from: '"MySociety " <team.ninja.alpha7@gmail.com>',
                    to: societyMembers.join(","),
                    subject: "New Announcement",
                    html: emailBody,
                };
                const sendMail = await EmailController.sendEmail(mailOption);
                res.status(201).send({
                    message: "Announcement created successfully.",
                    result: record,
                });
                return;
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Something is wrong please try again.",
        });
        return;
    }
};

exports.getAnnouncement = async (req, res) => {
    try {
        const { societyId, page = 1, limit = 10 } = req.body;
        const options = {
            page: page,
            limit: limit,
            sort: { created_at: -1 },
        };
        let query = {};
        if (societyId) {
            query.societyId = societyId;
        }

        Announcement.paginate(query, options, function (err, result) {
            if (err) {
                res.status(403).send({
                    message: "No announcement found.",
                });
                return;
            }

            res.status(200).send({
                message: "All announcement.",
                result: result,
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

exports.deleteAnnouncement = async (req, res) => {
    try {
        const { userId } = req;
        const { _id, societyId } = req.body;

        Announcement.findOneAndDelete(
            { _id: _id, societyId: societyId },
            (err, result) => {
                if (err) {
                    res.status(500).send({
                        message: "Something want wrong please try again.",
                        error: err,
                    });
                    return;
                }

                res.status(203).send({
                    message: "Announcement deleted successfully.",
                    result: result,
                });
                return;
            }
        );
    } catch (err) {
        res.status(500).send({
            message: "Something is wrong please try again.",
        });
        return;
    }
};
