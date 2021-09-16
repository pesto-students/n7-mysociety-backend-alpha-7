const EmailController = {
    getHtml: (template, argv) => {
        const ejs = require("ejs");
        try {
            return new Promise((resolve, reject) => {
                ejs.renderFile(
                    `./app/templates/${template}.ejs`,
                    argv,
                    function (error, fileContent) {
                        if (error != null) {
                            console.log("run this");
                            console.log(error, "error");
                            reject({
                                statusCode: 404,
                                body: "Please provide a valid template name.",
                                error: error,
                            });
                        }

                        resolve(fileContent);
                    }
                );
            });
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something want wrong please try again1.",
                error: error,
            };
        }
    },
    sendEmail: (emailBody) => {
        var nodemailer = require("nodemailer");
        try {
            return new Promise((resolve, reject) => {
                const transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    auth: {
                        user: "aiden.ankunding95@ethereal.email",
                        pass: "BnGSXMaGw3uPkrmQrq",
                    },
                    connectionTimeout: 200,
                    logger: true,
                });

                transporter.verify(function (error, success) {
                    if (error) {
                        console.log("Verification error", error);
                    } else {
                        console.log("Server is ready to take our messages");
                    }
                });
                let resp = false;

                transporter.sendMail(
                    {
                        from: '"Fred Foo" <foo@example.com>', // sender address
                        to: "bar@example.com, baz@example.com", // list of receivers
                        subject: "Hello ✔", // Subject line
                        text: "Hello world?", // plain text body
                        html: emailBody, // html body
                    },
                    function (error, info) {
                        if (error) {
                            console.log("error is " + error);
                            resolve(false); // or use rejcet(false) but then you will have to handle errors
                        } else {
                            console.log("Email sent: " + info.response);
                            resolve(true);
                        }
                    }
                );
            });
        } catch (error) {
            return { status: false, message: "ERROR_500", error };
        }
    },
};

module.exports = EmailController;
