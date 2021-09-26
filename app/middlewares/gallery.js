const db = require("../models");
const User = db.user;
const Joi = require("joi");
const { GALLERY } = require("../utils/constants");
/**
 * Validate input data at announcement create.
 */
createValidateData = (req, res, next) => {
  const schema = Joi.object({
    _id: Joi.string().optional(),
    category: Joi.string().required().messages({
      "any.required": GALLERY.VALIDATION.CATEGORY,
      "string.empty": GALLERY.VALIDATION.CATEGORY,
    }),
    images: Joi.array().required().messages({
      "any.required": GALLERY.VALIDATION.IMAGES,
      "string.empty": GALLERY.VALIDATION.IMAGES,
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

const verifySignUp = {
  createValidateData,
  deleteValidateData,
};

module.exports = verifySignUp;
