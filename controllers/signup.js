const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/db_controller");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
const randomToken = require("random-token");
const { check, validationResult } = require("express-validator");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post(
    "/", [
        check("username").notEmpty().withMessage("Username is required"),
        check("password").notEmpty().withMessage("Password is required"),
        check("email").notEmpty().isEmail().withMessage("Valid Email is required"),
    ],
    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const email_status = "not_verified";
        const email = req.body.email;
        const username = req.body.username;

        db.signup(
            req.body.username,
            req.body.email,
            req.body.password,
            email_status
        );
        const token = randomToken(8);
        db.getUserId(email, function(err, result) {
            const id = result[0].id;
            const output = ``;

            const transporter = nodemailer.createTransport({
                service: "gmail.com",
                auth: {
                    user: "",
                    pass: "",
                },
            });

            const mailOptions = {
                from: "",
                to: email,
                subject: "Email Verification",
                html: output,
            };

            transporter.sendMail(mailOptions, function(err, info) {
                if (err) return console.log(err);
            });

            res.send("Please check your email to verify!");
        });
    }
);

module.exports = router;