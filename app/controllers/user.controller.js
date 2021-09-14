exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userData = (req, res) => {
    res.status(200).send("User Content." + req.userId);
};
