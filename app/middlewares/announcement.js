const db = require("../models");
const User = db.user;
const Joi = require("joi");
const { ANNOUNCEMENT } = require("../utils/constants");
/**
 * Validate input data at announcement create.
 */
createValidateData = (req, res, next) => {
  const schema = Joi.object({
    _id: Joi.string().optional(),
    title: Joi.string().required().messages({
      "any.required": ANNOUNCEMENT.TITLE_REQUIRED,
      "string.empty": ANNOUNCEMENT.TITLE_NOT_EMPTY,
    }),
    desc: Joi.string().required().messages({
      "any.required": ANNOUNCEMENT.DESC_REQUIRED,
      "string.empty": ANNOUNCEMENT.DESC_NOT_EMPTY,
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

const announcement = {
  createValidateData,
  deleteValidateData,
};

module.exports = announcement;
