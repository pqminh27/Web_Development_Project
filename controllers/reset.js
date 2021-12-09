const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/db_controller");
const mysql = require("mysql");
const flash = require("flash");
const randomToken = require("random-token");
const nodemailer = require("nodemailer");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// router.get("/", (req, res) => {
//     res.render("resetpassword.ejs");
// });

router.post("/", function(req, res) {
    const email = req.body.email;
    db.findOne(email, function(err, result1) {
        if (!result1) {
            console.log("Your mail does not exist in our db");
            res.send("Mail does not exist");
        }
        const id = result1[0].id;
        const email = result1[0].email;
        const token = randomToken(8);
        db.temp(id, email, token, function(err, result2) {
            const output = `<p>Dear ${email}, you requested to reset your password, to continue please use id and token given below to verify your email address.</p>
                <ul>
                    <li> User ID: ${id}</li>
                    <li> Token: ${token}</li>
                    </ul>
                    <p> Please use this <a href="http://localhost:3000/login">link</a> to continue to login using the given new password.</p>
                    <p> You can change your password after you login.</p>
                    <p> This email is automatically generated, please do not reply to it!</p>
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
                subject: "Email Verification - Web Dev Reset Password",
                html: output,
            };

            transporter.sendMail(mailOptions, function(err, info) {
                if (err) return console.log("Send Mail reset Error: " + err);
                else console.log("Send Mail reset: " + info);
            });
        });
    });
    res.send("Please check your email to reset token!");
});

module.exports = router;