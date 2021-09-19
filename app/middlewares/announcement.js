const db = require("../models");
const User = db.user;
const Joi = require("joi");

/**
 * Validate input data at announcement create.
 */
createValidateData = (req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string().optional(),
        title: Joi.string().required().messages({
            "any.required": "Announcement title is required!",
            "string.empty": "Announcement title can't be empty!",
        }),
        desc: Joi.string().required().messages({
            "any.required": "Announcement description is required!",
            "string.empty": "Announcement description can't be empty!",
        }),
        societyId: Joi.string().required(),
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

const verifySignUp = {
    createValidateData,
};

module.exports = verifySignUp;
