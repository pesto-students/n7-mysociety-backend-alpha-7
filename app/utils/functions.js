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
                        console.log("\n>> Society users:\n", users);
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
};
