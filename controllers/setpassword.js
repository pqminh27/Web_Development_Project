const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const db = require.main.require("./models/db_controller");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", function(req, res) {
    res.render("setpassword.ejs");
});

router.post("/", function(req, res) {
    const token = req.body.token;
    db.checktoken(token, function(err, result) {
        if (result[0]) {
            const newpassword = req.body.password;
            const id = result[0].id;
            db.setpassword(id, newpassword, function(err, result1) {
                if (err) res.send("Token did not match!");
                else res.send("Password has been changed... Go to login page");
            });
        } else {
            res.send("Token did not match!");
        }
    });
});

module.exports = router;