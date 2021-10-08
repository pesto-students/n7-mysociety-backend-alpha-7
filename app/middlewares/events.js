const db = require("../models");
const User = db.user;
const Joi = require("joi");
const { EVENT } = require("../utils/constants");
/**
 * Validate input data at announcement create.
 */
createValidateData = (req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string().optional(),
        title: Joi.string().required().messages({
            "any.required": EVENT.VALIDATION.TITLE_REQUIRED,
            "string.empty": EVENT.VALIDATION.TITLE_NOT_EMPTY,
        }),
        desc: Joi.string().required().messages({
            "any.required": EVENT.VALIDATION.DESC_REQUIRED,
            "string.empty": EVENT.VALIDATION.DESC_NOT_EMPTY,
        }),
        fromDateTime: Joi.date().required().messages({
            "any.required": EVENT.VALIDATION.FROM_DATE_TIME,
            "string.empty": EVENT.VALIDATION.FROM_DATE_TIME,
        }),
        toDateTime: Joi.date().required().messages({
            "any.required": EVENT.VALIDATION.TO_DATE_TIME,
            "string.empty": EVENT.VALIDATION.TO_DATE_TIME,
        }),
        venue: Joi.string().required().messages({
            "any.required": EVENT.VALIDATION.VENUE,
            "string.empty": EVENT.VALIDATION.VENUE,
        }),
        img: Joi.string().optional(),
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

/**
 * Validate input data at announcement delete.
 */
deleteValidateData = (req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        societyId: Joi.string().required(),
    });
    const { error } = schema.validate(req.query);
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
    deleteValidateData,
};

module.exports = verifySignUp;
