const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/db_controller");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
const randomToken = require("random-token");
const { check, validationResult } = require("express-validator");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// router.get("/", function(req,res) {
//     res.render("signup.ejs");
// })

router.post(
    "/", [
        check("username").notEmpty().withMessage("Username is required"),
        check("password").notEmpty().withMessage("Password is required"),
        check("email").notEmpty().isEmail().withMessage("Valid Email required"),
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
        db.verify(req.body.username, email, token);

        db.getuserid(email, function(err, result) {
            const id = result[0].id;
            const output = `<p>Dear ${username}, you requested for email verification, to continue please use id and token given below to verify your email address</p>
            <ul>
                <li> User ID: ${id}</li>
                <li> Token: ${token}</li>
                </ul>
                <p> Please use this <a href="http://localhost:3000/verify">link</a> to continue verify</p>
                <p> This email is automatically generated, please do not reply to it</p>
                `;

            const transporter = nodemailer.createTransport({
                service: "gmail",
                port: 465,
                secure: true,
                auth: {
                    user: "pqminha127@gmail.com",
                    pass: "Phungminh27!",
                },
            });

            const mailOptions = {
                from: "pqminha127@gmail.com",
                to: email,
                subject: "Email Verification - Web Dev",
                html: output,
            };

            transporter.sendMail(mailOptions, function(err, info) {
                if (err) return console.log("Send Mail error: " + err);
                console.log("Send Mail: " + info);
            });

            res.send("Please check your email to verify!");
        });
    }
);

module.exports = router;