const db = require("../models");
const User = db.user;
const Society = db.society;
const axios = require("axios");
module.exports = {
    getSocietyMembers: (societyId) => {
        try {
            return new Promise((resolve, reject) => {
                User.find(
                    {
                        societyId: { $eq: societyId },
                        role: { $eq: "member" },
                    },
                    { email: 1, _id: 0 }
                )
                    .then((users) => {
                        console.log("\n>> Society members:\n", users);
                        resolve(users.flatMap((i) => i.email));
                    })
                    .catch((err) => {
                        console.log("No member found: error is " + err);
                        resolve(false);
                    });
            });
        } catch (err) {
            return false;
        }
    },
    getSocietyAdmins: (societyId) => {
        try {
            return new Promise((resolve, reject) => {
                User.find(
                    {
                        societyId: { $eq: societyId },
                        role: { $eq: "admin" },
                    },
                    { email: 1, _id: 0 }
                )
                    .then((users) => {
                        console.log("\n>> Society Admins:\n", users);
                        resolve(users.flatMap((i) => i.email));
                    })
                    .catch((err) => {
                        console.log("No admin found: error is " + err);
                        resolve(false);
                    });
            });
        } catch (err) {
            return false;
        }
    },
    getSociety: (user) => {
        try {
            return new Promise((resolve, reject) => {
                Society.findById(user.societyId)
                    .then((docSociety) => {
                        console.log("\n>> Get Society:\n", docSociety);
                        resolve(docSociety);
                    })
                    .catch((err) => {
                        console.log("No Society found: error is " + err);
                        resolve(false);
                    });
            });
        } catch (err) {
            return false;
        }
    },
    validateCaptcha: (param) => {
        try {
            return new Promise((resolve, reject) => {
                const url = `https://www.google.com/recaptcha/api/siteverify?secret=6Ler8I0cAAAAAB1JmofItvknJxYql0AtD4_A8bWc&response=${param.captcha}`;

                axios
                    .post(
                        url,
                        {},
                        {
                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded; charset=utf-8",
                            },
                        }
                    )
                    .then((response) => {
                        console.log("\n>> Captcha response :\n", response);
                        resolve(response.data.success);
                    })
                    .catch((err) => {
                        console.log("Captcha valid fail " + err);
                        resolve(false);
                    });
            });
        } catch (err) {
            console.log(err, "err");
            return false;
        }
    },
    queryStringToObject: (queryString) => {
        try {
            const pairs = queryString.substring(1).split("&");
            var array = pairs.map((el) => {
                const parts = el.split("=");
                return parts;
            });
            return Object.fromEntries(array);
        } catch (err) {
            console.log(err, "err");
            return false;
        }
    },
};
