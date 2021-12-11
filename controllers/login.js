const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/db_controller");
const mysql = require("mysql");
const { check, validationResult } = require("express-validator");
const session = require("express-session");
const sweetalert = require("sweetalert2");

router.get("/", (req, res) => {
    res.render("login.ejs");
});

const config = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

router.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post(
    "/", [
        check("username").notEmpty().withMessage("Username is required"),
        check("password").notEmpty().withMessage("Password is required"),
    ],
    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const username = req.body.username;
        const password = req.body.password;

        if (username && password) {
            config.query(
                "SELECT * FROM users WHERE username = ? AND password = ?", [username, password],
                function(error, results, fields) {
                    if (result[0]) {
                        //result[0] != undefined
                        req.session.loggedIn = true;
                        req.session.username = username;
                        res.cookie("username", username);
                        const status = results[0].email_status;
                        if (status == "not_verified") {
                            res.send("Please verify your email");
                        } else {
                            sweetalert.fire("Logged In");
                            res.redirect("/home");
                        }
                    } else res.send("Incorect username or password.");

                    res.end();
                }
            );
        } else {
            res.send("Please Enter username and password");
            res.end();
        }
    }
);

module.exports = router;