const db = require("../models");
const User = db.user;
const Joi = require("joi");
const { COMPLAINT } = require("../utils/constants");
/**
 * Validate input data at announcement create.
 */
createValidateData = (req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string().optional(),
        title: Joi.string().required().messages({
            "any.required": COMPLAINT.TITLE_REQUIRED,
            "string.empty": COMPLAINT.TITLE_NOT_EMPTY,
        }),
        desc: Joi.string().required().messages({
            "any.required": COMPLAINT.DESC_REQUIRED,
            "string.empty": COMPLAINT.DESC_NOT_EMPTY,
        }),
        societyId: Joi.string().required(),
        status: Joi.string().valid("Pending", "Resolved", "Reject").optional(),
        priority: Joi.string().valid("High", "Medium", "Low").optional(),
        comment: Joi.string().optional(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send({
            message: error.details[0].message,
        });
        return;
    }
    next();
};

const complaint = {
    createValidateData,
};

module.exports = complaint;
