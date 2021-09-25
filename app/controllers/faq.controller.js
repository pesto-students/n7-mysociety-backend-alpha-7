const { FAQS, COMMON } = require("../utils/constants");
const db = require("../models");
const Faqs = db.faqs;
exports.getFaqs = async function (req, res) {
  try {
    Faqs.find((error, result) => {
      if (error) {
        res.status(403).send({ message: FAQS.RESPONSE.NOT_FOUND });
      }
      res.status(200).send({ message: FAQS.RESPONSE.ALL, result: result });
    });
  } catch (error) {
    res.status(500).send({ message: COMMON.SOMETHING_WRONG });
  }
};

exports.createFaq = async function (req, res) {
  try {
    const { _id, question, answer } = req.body;

    if (_id) {
      const filter = _.pick(req.body, ["_id"]);
      const update = _.pick(req.body, ["question", "answer"]);
      Faqs.findOneAndUpdate(
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
            message: FAQS.RESPONSE.UPDATED,
            result: result,
          });
          return;
        }
      );
    } else {
      const faq = new Faqs({
        question: question,
        answer: answer,
      });

      faq.save(async (err, record) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(201).send({
          message: FAQS.RESPONSE.CREATED,
          result: record,
        });
        return;
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: COMMON.SOMETHING_WRONG,
    });
    return;
  }
};

exports.deleteFaq = async function (req, res) {
  try {
    const { _id } = req.query;
    Faqs.findOneAndDelete({ _id: _id }, (err, result) => {
      if (err) {
        res.status(500).send({
          message: COMMON.SOMETHING_WRONG,
          error: err,
        });
        return;
      }

      res.status(203).send({
        message: FAQS.RESPONSE.DELETED,
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
