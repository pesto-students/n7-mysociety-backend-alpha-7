const fs = require("fs");
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const uploadFile = async (files) => {
  try {
    console.log("New uploaded files", newImages);
    const params = {
      Bucket: "mysociety-app",
      Key: "",
      Body: JSON.stringify(data, null, 2),
    };
    for (const file in files) {
      const fileContent = fs.readFileSync(file);
      const data = await s3.upload(params);
    }

    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
    });
  } catch {
    next();
  }
};

module.exports = uploadFile;
