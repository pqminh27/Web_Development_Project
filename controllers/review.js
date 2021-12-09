const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const db = require.main.require("./models/db_controller");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("*", (req, res, next) => {
    if (req.cookies["username"] == null) res.redirect("/login");
    //fix to just admin
    else next();
});

router.get("/", function(req, res) {
    res.render("review.ejs");
});

router.post("/", function(req, res) {
    const message = req.body.message;
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    db.postReview(message, name, email, subject, function(err, result) {
        res.redirect("back"); //redirecting back to the referer. If no referer is present, the request is redirected to "/" route by default
    });
});

module.exports = router;