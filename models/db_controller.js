require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const config = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

config.connect((err) => {
    if (err) throw err;
    else console.log("Database Connected");
});

module.exports.signup = function(username, email, password, status, callback) {
    config.query(
        `SELECT email FROM users WHERE email = "${email}"`,
        function(err, result) {
            console.log(result[0]);
            if (result[0] == undefined) {
                const query = `INSERT INTO users(username,email,password,email_status) VALUES("${username}","${email}","${password}","${status}")`;
                config.query(query, callback);
            } else console.log("Error at db signup");
        }
    );
};

module.exports.verify = function(username, email, token, callback) {
    const query = `INSERT INTO verify(username,email,token) VALUES("${username}","${email}","${token}")`;
    config.query(query, callback);
};

module.exports.matchtoken = function(id, token, callback) {
    const query =
        'SELECT * FROM verify WHERE token = "' + token + '" AND id = "' + id + '"';
    config.query(query, callback);
};

module.exports.updateverify = function(email, email_status, callback) {
    const query = `UPDATE users SET email_status = "${email_status}" WHERE email = "${email}"`;
    config.query(query, callback);
};

module.exports.getuserid = function(email, callback) {
    const query = 'SELECT * FROM verify WHERE email="' + email + '"';
    config.query(query, callback);
};