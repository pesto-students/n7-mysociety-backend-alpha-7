const config = require("../config");
const db = require("../models");
const _ = require("lodash");
const Gallery = db.gallery;
const User = db.user;
const EmailController = require("./email");
const utils = require("../utils/functions");
const { COMMON, GALLERY } = require("../utils/constants");

exports.getGallery = async function (req, res) {
  const { societyId } = req.query;
  Gallery.find({ societyId }, (error, result) => {
    if (error) {
      res.status(403).send({ message: GALLERY.RESPONSE.NOT_FOUND });
    }
    res.status(200).send({ message: GALLERY.RESPONSE.ALL, result: result });
  }).sort([["created_at", -1]]);
};

exports.deleteGallery = async function (req, res) {
  try {
    const { userId } = req;
    const { _id, societyId } = req.query;
    Gallery.findOneAndDelete(
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
          message: GALLERY.RESPONSE.DELETED,
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

exports.createGallery = async function (req, res) {
  try {
    const { _id, images, category, societyId } = req.body;
    const filter = _.pick(req.body, ["_id", "societyId"]);
    const galleryDetails = _.pick(req.body, ["category", "images"]);
    if (_id) {
      Gallery.findOneAndUpdate(
        filter,
        galleryDetails,
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
            message: GALLERY.RESPONSE.UPDATED,
            result: result,
          });
          return;
        }
      );
    } else {
      const gallery = new Gallery({
        category,
        societyId,
        images,
      });
      gallery.save(async (err, record) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        const societyMembers = await utils.getSocietyMembers(societyId);
        const emailBody = await EmailController.getHtml("default", {
          body:
            "New Gallery is there in your society. Open MySociety app for more details.",
        });
        const mailOption = {
          from: '"MySociety " <team.ninja.alpha7@gmail.com>',
          to: societyMembers.join(","),
          subject: "New Event",
          html: emailBody,
        };
        const sendMail = await EmailController.sendEmail(mailOption);
        res.status(201).send({
          message: GALLERY.RESPONSE.CREATED,
          result: record,
        });
        return;
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: COMMON.SOMETHING_WRONG,
    });
    return;
  }
};
