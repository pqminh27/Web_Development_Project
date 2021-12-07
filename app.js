require("dotenv").config();

const express = require("express");
const app = express();
// const session = require("express-session");
//const cookie = require('cookie-parser');
//const multer = require('multer');
//const async = require('async');
//const nodemailer = require('nodemailer');
//const crypto = require('crypto');
//const expressValidator = require('express-validator');
// const sweetalert = require('sweetalert2');
//const bodyParser = require('body-parser');
//const mysql = require("mysql");
const path = require("path");
const methodOverride = require("method-override"); //to override DELETE and PUT in HTML form
const ejsMate = require("ejs-mate");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
//const userRoutes = require("./routes/users");
//const db = require('./models/db_controller');
//const signup = require("./controllers/signup");

//app.use("/public", express.static(path.join(__dirname, "static"))); //absolute path to static folder to be more accurate, more safe

app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//app.use(express.json());
//app.use(cookie());
const port = process.env.PORT;

// function authenticateAdmin(req, res, next) {
//     if (req.query.admin === "true") next();
//     else {
//         res.send("Client page")
//     }
// }

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

app.get("/home", (req, res) => {
    res.render("boilerplate");
});

//app.use("/signup", signup);
//app.use("/user", userRoutes);

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found!", 404));
});

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = "Some Errors here!";
    res.status(status).render("error", { err });
});

//error handler
app.use(function(err,req,res,next) {
    res.locals.message = err.message;
    res.status(err.status || 500);
    res.render("error.ejs");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});