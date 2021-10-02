const config = require("../../config");
const { COMMON } = require("../../utils/constants");
const content = require("../../templates/default");
const ejs = require("ejs");
const EmailController = {
    getHtml: (argv) => {
        try {
            return new Promise((resolve, reject) => {
                try {
                    const fileContent = ejs.render(content, argv);
                    resolve(fileContent);
                } catch (error) {
                    console.log(error, "error in ejs template");
                    resolve({
                        statusCode: 500,
                        body: COMMON.SOMETHING_WRONG,
                        error: error,
                    });
                }
            });
        } catch (error) {
            return {
                statusCode: 500,
                body: COMMON.SOMETHING_WRONG,
                error: error,
            };
        }
    },
    sendEmail: (mailOption) => {
        var nodemailer = require("nodemailer");
        try {
            return new Promise((resolve, reject) => {
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    auth: {
                        user: config.SMTP_USER,
                        pass: config.SMTP_PASS,
                    },
                    logger: true,
                });

                transporter.verify(function (error, success) {
                    if (error) {
                        console.log("Verification error", error);
                    } else {
                        console.log("Server is ready to take our messages");
                    }
                });

                transporter.sendMail(mailOption, function (error, info) {
                    if (error) {
                        console.log("error is " + error);
                        resolve(false); // or use rejcet(false) but then you will have to handle errors
                    } else {
                        console.log("Email sent: " + info.response);
                        resolve(true);
                    }
                });
            });
        } catch (error) {
            return { status: false, message: COMMON.SOMETHING_WRONG, error };
        }
    },
};

module.exports = EmailController;
