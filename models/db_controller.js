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

module.exports.findOne = function(email, callback) {
    const query = `SELECT * FROM users WHERE email = "${email}"`;
    config.query(query, callback);
};

module.exports.temp = function(id, email, token, callback) {
    const query = `INSERT INTO temp(id,email,token) VALUES("${id}","${email}","${token}")`;
    config.query(query, callback);
};

module.exports.addEmployee = function(
    name,
    email,
    contact,
    join_date,
    role,
    salary,
    callback
) {
    const query = `INSERT INTO employee(name,email,
        contact,
        join_date,
        role,
        salary) VALUES("${name}"",
            "${email}",
            "${contact}",
            "${join_date}",
            "${role}",
            "${salary}")`;
    config.query(query, callback);
};

module.exports.getAllEmployee = function(callback) {
    const query = "SELECT * FROM employee";
    config.query(query, callback);
};

module.exports.getEmployeeById = function(id, callback) {
    const query = `SELECT * FROM employee WHERE id = "${id}"`;
    config.query(query, callback);
};

module.exports.editEmployee = function(
    id,
    name,
    email,
    contact,
    join_date,
    role,
    salary,
    callback
) {
    const query = `UPDATE employee SET name = "${name}", email = "${email}", contact = "${contact}", join_date = "${join_date}", role = "${role}", salary = "${salary}" WHERE id = "${id}"`;
    config.query(query, callback);
};

module.exports.deleteEmployee = function(id, callback) {
    const query = `DELETE FROM employee WHERE id = "${id}"`;
    config.query(query, callback);
};

module.exports.searchEmployee = function(key, callback) {
    const query = `SELECT * FROM employee WHERE name LIKE "%${key}%"`;
    config.query(query, callback);
};

module.exports.addOrder = function(
    name,
    email,
    phone,
    date,
    time,
    people,
    callback
) {
    const query = `INSERT INTO order(name,email,phone,date,time,people) VALUES ("${name}","${email}","${phone}","${date}","${time}","${people}")`;
    config.query(query, callback);
};

module.exports.getAllOrders = function(callback) {
    const query = "SELECT * FROM order";
    config.query(query, callback);
};

module.exports.getOrderById = function(id, callback) {
    const query = `SELECT * FROM order WHERE id = "${id}"`;
    config.query(query, callback);
};

module.exports.editOrder = function(
    id,
    name,
    email,
    phone,
    date,
    time,
    people,
    callback
) {
    const query = `UPDATE order SET name = "${name}", email = "${email}", phone = "${phone}", date = "${date}", time = "${time}", people = "${people}" WHERE id = "${id}"`;
    config.query(query, callback);
};

module.exports.deleteOrder = function(id, callback) {
    const query = `DELETE FROM order WHERE id = "${id}"`;
    config.query(query, callback);
};

module.exports.getAllFoods = function(callback) {
    const query = "SELECT * FROM food ORDER BY id DESC";
    config.query(query, callback);
};

module.exports.getFoodById = function(id, callback) {
    const query = `SELECT * FROM food WHERE id = "${id}"`;
    config.query(query, callback);
};

module.exports.addFood = function(name, price, quantity, callback) {
    const query = `INSERT INTO food(name,price,quantity) VALUES ("${name}","${price}","${quantity}")`;
    config.query(query, callback);
};

module.exports.editFood = function(id, name, price, quantity, callback) {
    const query = `UPDATE food SET name = "${name}", price = "${price}", quantity = "${quantity}" WHERE id = "${id}"`;
    config.query(query, callback);
};

module.exports.deleteFood = function(id, callback) {
    const query = `DELETE FROM food WHERE id = "${id}"`;
    config.query(query, callback);
};

module.exports.searchFood = function(key, callback) {
    const query = `SELECT * FROM food WHERE name LIKE "%${key}%"`;
    config.query(query, callback);
};

module.exports.postReview = function(message, name, email, subject, callback) {
    const query = `INSERT INTO review(message,name,email,subject) VALUES("${message}","${name}","${email}","${subject}")`;
    config.query(query, callback);
};

module.exports.getReview = function(callback) {
    const query = "SELECT * FROM review";
    config.query(query, callback);
};