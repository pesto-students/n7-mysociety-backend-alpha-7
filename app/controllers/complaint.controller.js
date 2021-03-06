const config = require("../config");
const db = require("../models");
const _ = require("lodash");
const Complaint = db.complaint;
const EmailController = require("./email");
const utils = require("../utils/functions");
const { COMMON, COMPLAINT, SETTINGS } = require("../utils/constants");

exports.createUpdateComplaint = async (req, res) => {
    try {
        const { userId, userRole } = req;
        const { _id, title, desc, societyId, status, comment, priority } =
            req.body;

        if (_id) {
            const filter = _.pick(req.body, ["_id", "societyId"]);
            let update = null;
            if (userRole === "admin" || comment || status) {
                if (comment && status) {
                    update = {
                        status: status,
                        $push: { comments: { comment: comment } },
                    };
                } else if (comment) {
                    update = {
                        $push: { comments: { comment: comment } },
                    };
                } else if (status) {
                    update = {
                        status: status,
                    };
                }
            } else if (userRole === "member") {
                update = _.pick(req.body, ["title", "desc", "priority"]);
            }
            if (update !== null) {
                Complaint.findOneAndUpdate(
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
                            message: COMPLAINT.UPDATED,
                            result: result,
                        });
                        return;
                    }
                );
            } else {
                res.status(400).send({
                    message: COMPLAINT.SOMETHING_MISSING,
                });
                return;
            }
        } else {
            const complaint = new Complaint({
                title: title,
                desc: desc,
                status: status ? status : "Pending",
                priority: priority ? priority : "Low",
                societyId: societyId,
                postedBy: userId,
            });

            complaint.save(async (err, record) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                console.log(record, "record");
                const societyAdmins = await utils.getSocietyAdmins(societyId);
                const emailBody = await EmailController.getHtml({
                    clientURI: config.clientURI,
                    buttonUrl: `${config.clientURI}complaints`,
                    buttonText: "View Complaint",
                    body: "New complaint created by society member. Open MySociety app for more details.",
                });
                const mailOption = {
                    from: '"MySociety " <no-reply@gmail.com>',
                    to: societyAdmins.join(","),
                    subject: "New Complaint Arise",
                    html: emailBody,
                };
                const sendMail = await EmailController.sendEmail(mailOption);
                res.status(201).send({
                    message: COMPLAINT.CREATED,
                    result: record,
                    sendMail: sendMail,
                });
                return;
            });
        }
    } catch (err) {
        console.log(err, "err");
        res.status(500).send({
            message: COMMON.SOMETHING_WRONG,
        });
        return;
    }
};

exports.getComplaint = async (req, res) => {
    try {
        const { userId, userRole } = req;
        const {
            societyId,
            page = 1,
            limit = SETTINGS.DEFAULT_PAGE_LIMIT,
            status,
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
        if (status) {
            query.status = { $eq: status };
        }
        if (userRole === "member") {
            query.postedBy = { $eq: userId };
        }

        Complaint.paginate(query, options, function (err, result) {
            if (err) {
                res.status(403).send({
                    message: COMPLAINT.NOT_FOUND,
                });
                return;
            }

            res.status(200).send({
                message: COMPLAINT.ALL,
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
