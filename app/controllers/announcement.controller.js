const config = require("../config");
const db = require("../models");
const _ = require("lodash");
const Announcement = db.announcement;
const EmailController = require("./email");
const utils = require("../utils/functions");
const { ANNOUNCEMENT, COMMON, SETTINGS } = require("../utils/constants");

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
                            message: COMMON.SOMETHING_WRONG,
                            error: err,
                        });
                        return;
                    }

                    announcement.save(async (err, record) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        const societyMembers = await utils.getSocietyMembers(
                            societyId
                        );
                        const emailBody = await EmailController.getHtml(
                            "default",
                            {
                                body: "New announcement is there in your society. Open MySociety app for more details.",
                            }
                        );
                        const mailOption = {
                            from: '"MySociety " <team.ninja.alpha7@gmail.com>',
                            to: societyMembers.join(","),
                            subject: "New Announcement",
                            html: emailBody,
                        };
                        const sendMail = await EmailController.sendEmail(
                            mailOption
                        );
                        res.status(201).send({
                            message: ANNOUNCEMENT.CREATED,
                            result: record,
                            sendMail: sendMail,
                        });
                        return;
                    });
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
                    clientURI: config.clientURI,
                    buttonUrl: `${config.clientURI}announcements`,
                    buttonText: "View Announcement",
                    body: "New announcement is there in your society. Open MySociety app for more details.",
                });
                const mailOption = {
                    from: '"MySociety " <no-reply@gmail.com>',
                    to: societyMembers.join(","),
                    subject: "New Announcement",
                    html: emailBody,
                };
                const sendMail = await EmailController.sendEmail(mailOption);
                res.status(201).send({
                    message: ANNOUNCEMENT.CREATED,
                    result: record,
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

exports.getAnnouncement = async (req, res) => {
    try {
        const {
            societyId,
            page = 1,
            limit = SETTINGS.DEFAULT_PAGE_LIMIT,
            filterType,
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
        if (filterType) {
            let latestDate = new Date();
            latestDate.setDate(
                latestDate.getDate() - SETTINGS.ANNOUNCEMENT.LATEST_DAYS
            );
            if (filterType === "latest") {
                query.created_at = { $gte: latestDate.getTime() };
            } else if (filterType === "pasts") {
                query.created_at = { $lte: latestDate.getTime() };
            }
        }

        Announcement.paginate(query, options, function (err, result) {
            if (err) {
                res.status(403).send({
                    message: ANNOUNCEMENT.NOT_FOUND,
                });
                return;
            }

            Announcement.paginate(query, options, function (err, result) {
                if (err) {
                    res.status(403).send({
                        message: ANNOUNCEMENT.NOT_FOUND,
                    });
                    return;
                }

                res.status(200).send({
                    message: ANNOUNCEMENT.ALL,
                    result: result,
                });
                return;
            });
        });
    } catch (err) {
        res.status(500).send({
            message: COMMON.SOMETHING_WRONG,
        });
        return;
    }
};

exports.deleteAnnouncement = async (req, res) => {
    try {
        const { userId } = req;
        const { _id, societyId } = req.query;
        console.log("request params", _id, societyId);
        Announcement.findOneAndDelete(
            { _id: _id, societyId: societyId },
            (err, result) => {
                if (err) {
                    res.status(500).send({
                        message: COMMON.SOMETHING_WRONG,
                        error: err,
                    });
                    return;
                }

                res.status(203).send({
                    message: ANNOUNCEMENT.DELETED,
                    result: result,
                });
                return;
            }
        );
    } catch (err) {
        res.status(500).send({
            message: COMMON.SOMETHING_WRONG,
        });
        return;
    }
};
