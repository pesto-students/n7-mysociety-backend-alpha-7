var aws = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const fileFilter = (req, file, cb) => {
  if (file.mimeType === "image/jpg" || file.mimeType === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid mimetype only JPEG and PNG allowed"), false);
  }
};

// function (req, file, cb) {
//       cb(null, "image/jpeg");
//     }
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "mysociety-app",
    acl: "public-read",
    contentType: function (req, file, cb) {
      cb(null, "image/jpeg");
    },
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_META_DATA!" });
    },
    key: function (req, file, cb) {
      cb(null, `gallery/${file.originalname}`);
    },
  }),
});

module.exports = upload;
