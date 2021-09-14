const db = require("../models");
const User = db.user;
const Joi = require("joi");
/**
 * Check email is already exist or not.
 */
checkExistingUserEmail = (req, res, next) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: "Something is wrong please try again.",
                error: err,
            });
            return;
        }

        if (user) {
            res.status(400).send({
                message: "Oops! Email is already in use!",
            });
            return;
        }
    });
    next();
};

/**
 * Validate input data at signup time.
 */
validateData = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().min(5).max(255).required().email(),
        mobile: Joi.string()
            .length(10)
            .pattern(/^[0-9]+$/)
            .required(),
        societyId: Joi.string().required(),
        flatId: Joi.string().required(),
        password: Joi.string().min(5).max(255).required(),
        confirmPassword: Joi.ref("password"),
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
