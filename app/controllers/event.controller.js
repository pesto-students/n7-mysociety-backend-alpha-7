const config = require("../config");
const db = require("../models");
const _ = require("lodash");
const Event = db.event;
const User = db.user;
const EmailController = require("./email");
const utils = require("../utils/functions");
const { COMMON, EVENT } = require("../utils/constants");
exports.createupdateEvent = async (req, res) => {
    try {
        const { userId } = req;
        const {
            _id,
            title,
            desc,
            societyId,
            fromDateTime,
            toDateTime,
            venue,
            img,
        } = req.body;

        if (_id) {
            const filter = _.pick(req.body, ["_id", "societyId"]);
            const update = _.pick(req.body, [
                "title",
                "desc",
                "fromDateTime",
                "toDateTime",
                "venue",
                "img",
            ]);
            Event.findOneAndUpdate(
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
                        message: EVENT.RESPONSE.UPDATED,
                        result: result,
                    });
                    return;
                }
            );
        } else {
            console.log(title, desc, fromDateTime, toDateTime, venue, img);
            const event = new Event({
                title: title,
                desc: desc,
                societyId: societyId,
                fromDateTime: fromDateTime,
                toDateTime: toDateTime,
                venue: venue,
                img: img,
            });

            event.save(async (err, record) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                const societyMembers = await utils.getSocietyMembers(societyId);
                const emailBody = await EmailController.getHtml({
                    clientURI: config.clientURI,
                    buttonUrl: `${config.clientURI}events`,
                    buttonText: "View Event",
                    body: "New Event is there in your society. Open MySociety app for more details.",
                });
                const mailOption = {
                    from: '"MySociety " <no-reply@gmail.com>',
                    to: societyMembers.join(","),
                    subject: "New Event",
                    html: emailBody,
                };
                const sendMail = await EmailController.sendEmail(mailOption);
                res.status(201).send({
                    message: EVENT.RESPONSE.CREATED,
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

exports.getEvents = async (req, res) => {
    try {
        const { societyId, page = 1, limit = 10, filterType } = req.query;
        const options = {
            page: page,
            limit: limit,
            filterType: filterType,
            sort: { created_at: -1 },
        };
        let query = {};
        if (societyId) {
            query.societyId = societyId;
        }
        if (filterType) {
            let startOffToday = new Date();
            let today = new Date(
                startOffToday.getFullYear(),
                startOffToday.getMonth(),
                startOffToday.getDate()
            );
            let tomorrow = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + 1
            );
            if (filterType === "todays") {
                query.fromDateTime = { $gte: today, $lte: tomorrow };
            } else if (filterType === "past") {
                query.fromDateTime = { $lt: today };
            } else if (filterType === "upcoming") {
                query.fromDateTime = { $gte: tomorrow };
            }
        }

        Event.paginate(query, options, function (err, result) {
            if (err) {
                res.status(403).send({
                    message: EVENT.RESPONSE.NOT_FOUND,
                });
                return;
            }

            res.status(200).send({
                message: EVENT.RESPONSE.ALL,
                result: result,
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

exports.deleteEvent = async (req, res) => {
    try {
        const { userId } = req;
        const { _id, societyId } = req.query;
        Event.findOneAndDelete(
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
                    message: EVENT.RESPONSE.DELETED,
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
