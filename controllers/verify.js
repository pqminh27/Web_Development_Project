const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/db_controller");
const mysql = require("mysql");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", function(req, res) {
    const id = req.body.id;
    const token = req.body.token;
    console.log("token: " + token);
    db.matchtoken(id, token, function(err, result) {
        if (result.length > 0) {
            const email = result[0].email;
            const email_status = "verified";
            db.updateverify(email, email_status, function(err, result) {
                res.send("Your email is verified!");
            });
        } else {
            res.send("Token did not match");
        }
    });
});

module.exports = router;