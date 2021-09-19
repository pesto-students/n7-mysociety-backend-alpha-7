const db = require("../models");
const User = db.user;
const Joi = require("joi");
const { AUTH, COMMON } = require("../utils/constants");
/**
 * Check email is already exist or not.
 */
checkExistingUserEmail = (req, res, next) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: COMMON.SOMETHING_WRONG,
                error: err,
            });
            return;
        }

        if (user) {
            res.status(400).send({
                message: AUTH.SIGNUP.EMAIL_ALREADY_EXIST,
            });
            return;
        }
        next();
    });
};

/**
 * Validate input data at signup time.
 */
validateData = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().min(5).max(255).required().email(),
        mobile: Joi.string()
            .length(10)
            .pattern(/^[0-9]+$/)
            .when("role", {
                is: "member",
                then: Joi.required(),
                otherwise: Joi.string().optional(),
            }),
        societyId: Joi.when("role", {
            is: "member",
            then: Joi.required(),
            otherwise: Joi.string().optional(),
        }),
        flatNo: Joi.when("role", {
            is: "member",
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),
        role: Joi.string().valid("admin", "member").required(),
        societyName: Joi.when("role", {
            is: "admin",
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),
        societyAddress: Joi.when("role", {
            is: "admin",
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),
        password: Joi.string().min(5).max(255).required(),
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
    checkExistingUserEmail,
    validateData,
};

module.exports = verifySignUp;
