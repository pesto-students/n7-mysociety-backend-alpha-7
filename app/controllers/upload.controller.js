const upload = require("../utils/upload");
const uploads = upload.array("image", 10);
const singleUploads = upload.single("image");
const { COMMON } = require("../utils/constants");
exports.uploadFiles = async (req, res) => {
  try {
    uploads(req, res, function (error) {
      if (error) {
        res.status(500).send({ message: COMMON.SOMETHING_WRONG });
      }
      return res.json({ imageUrls: req.files.map((file) => file.location) });
    });
  } catch (error) {
    res.status(500).send({ message: COMMON.SOMETHING_WRONG });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    singleUploads(req, res, function (error) {
      if (error) {
        res.status(500).send({ message: COMMON.SOMETHING_WRONG });
      }
      return res.json({ imageUrl: req.file.location });
    });
  } catch (error) {
    res.status(500).send({ message: COMMON.SOMETHING_WRONG });
  }
};
