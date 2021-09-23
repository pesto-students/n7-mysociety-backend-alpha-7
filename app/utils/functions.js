const db = require("../models");
const User = db.user;

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
};
