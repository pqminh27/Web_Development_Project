const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const db = require.main.require("./models/db_controller");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("*", (req, res, next) => {
    if (req.cookies["username"] == null) res.redirect("/login");
    else next();
});

router.get("/", function(req, res) {
    db.getAllOrders(function(err, result) {
        res.render("order_table.ejs", { list: result });
    });
});

router.get("/add_order", function(req, res) {
    res.render("add_order.ejs");
});

router.post("/add_order", function(req, res) {
    db.addOrder(
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.date,
        req.body.time,
        req.body.people,
        function(err, result) {
            res.redirect("/order");
        }
    );
});

router.get("/edit_order/:id", function(req, res) {
    const id = req.params.id;
    db.getOrderById(id, function(err, result) {
        res.render("edit_order.ejs", { list: result });
    });
});

router.post("/edit_order/:id", function(req, res) {
    const id = req.params.id;
    db.editOrder(
        id,
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.date,
        req.body.time,
        req.body.people,
        function(err, result) {
            res.redirect("/order");
        }
    );
});

router.get("/delete_order/:id", function(req, res) {
    const id = req.params.id;
    db.getOrderById(id, function(err, result) {
        res.render("delete_order.ejs", { list: result });
    });
});

router.post("/delete_order/:id", function(req, res) {
    const id = req.params.id;
    db.deleteOrder(id, function(err, result) {
        res.redirect("/order");
    });
});

module.exports = router;