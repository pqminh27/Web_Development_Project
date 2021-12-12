const express = require("express");
const app = express();
require("dotenv").config();
const session = require("express-session");
const cookie = require("cookie-parser");
const multer = require("multer");
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const expressValidator = require("express-validator");
const sweetalert = require("sweetalert2");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const methodOverride = require("method-override"); //to override DELETE and PUT in HTML form
const ejsMate = require("ejs-mate");
const cookieParser = require("cookie-parser");
const { ROLE, authUser, authRole } = require("./authenticateUser");
const {
    canViewProject,
    scopedProjects,
    canDeleteProject,
} = require("./permission");
//const expressLayouts = require("express-ejs-layouts");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");

const db = require("./models/db_controller");
const signup = require("./controllers/signup");
const login = require("./controllers/login");
const logout = require("./controllers/logout");
const verify = require("./controllers/verify");
const resetpass = require("./controllers/reset");
const employee = require("./controllers/employee_controller");
const ordertable = require("./controllers/order_table");
const food = require("./controllers/food");
const receipt = require("./controllers/receipt");
const review = require("./controllers/review");
const setpass = require("./controllers/setpassword");
const admin = require("./controllers/admin");

app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(cookie());
const port = process.env.PORT;

// const sessionConfig = {
//     secret: 'thisissecret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //expires after 1 week
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }

// app.use(session(sessionConfig))
// app.use(flash())
// app.use(passport.initialize())
// app.use(passport.session())

// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

// app.use((req, res, next) => {
//     if (!["/login", "/"].includes(req.originalUrl)) {
//         req.session.returnToUrl = req.originalUrl;
//     }
//     res.locals.currentUser = req.user;
//     //res.locals.success = req.flash('success')
//     res.locals.error = req.flash("error");
//     next();
// });

app.use("/signup", signup);
app.use("/login", login);
app.use("/logout", logout);
app.use("/verify", verify);
app.use("/resetpassword", resetpass);
app.use("/setpassword", setpass);
app.use("/employee", employee);
app.use("/ordertable", ordertable);
app.use("/food", food);
app.use("/receipt", receipt);
app.use("/review", review);
app.use("/admin", admin);

app.get("/", (req, res) => {
    res.render("home");
});

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = "Some Errors here!";
    res.status(status).render("error.ejs");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;