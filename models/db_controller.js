require("dotenv").config();
const mysql = require("mysql");
const expres = require("express");
const router = expres.Router();
const bodyParser = require("body-parser");

const config = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

config.connect((err) => {
  if (err) throw err;
  else console.log("Database Connected");
});

module.exports.signup = function (username, email, password, status, callback) {
  config.query('SELECT email FROM users WHERE email = "' + email + '"'),
    function (err, result) {
      if (result[0] == undefined) {
        const query =
          'INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES ("' +
          username +
          '","' +
          email +
          '","' +
          password +
          '","' +
          status +
          '")';
        config.query(query, callback);
      } else console.log("Error at db signup");
    };
};

module.exports.verify = function (username, email, token, callback) {
  const query =
    'INSERT INTO `verify`(`username`,`email`,`token`) VALUES("' +
    username +
    ',"' +
    email +
    '","' +
    token +
    '")';
  config.query(query, callback);
};

module.exports.getUserId = function (email, callback) {
  const query = 'SELECT * FROM users WHERE email="' + email + '"';
  config.query(query, callback);
};
