const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const db = require.main.require("./models/db_controller");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// router.get("*", function(req, res, next) {
//     if (req.cookies["username"] == null) {
//         res.redirect("/login");
//     } else {
//         next();
//     }
// });

router.get("/", function(req, res) {
    db.getAllFoods(function(err, result) {
        if (err) throw err;
        res.render("food.ejs", { list: result });
    });
});

router.get("/addFood", function(req, res) {
    res.render("addFood.ejs");
});

router.post("/addFood", function(req, res) {
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;
    db.addFood(name, price, quantity, function(err, result) {
        res.redirect("/food");
    });
});

router.get("/editFood/:id", function(req, res) {
    const id = req.params.id;
    db.getFoodById(id, function(err, result) {
        res.render("edit_food.ejs", { list: result });
    });
});

router.post("/editFood/:id", function(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;
    db.editFood(id, name, price, quantity, function(err, result) {
        res.redirect("/food");
    });
});

router.get("/deleteFood/:id", function(req, res) {
    const id = req.params.id;
    db.getFoodById(id, function(err, result) {
        res.render("delete_food.ejs", { list: result });
    });
});

router.post("/deleteFood/:id", function(req, res) {
    const id = req.params.id;
    db.deleteFood(id, function(err, result) {
        res.redirect("/food");
    });
});

router.post("/search", function(req, res) {
    const key = req.body.search;
    db.searchFood(key, function(err, result) {
        console.log(result);
        res.render("food.ejs", { list: result });
    });
});

module.exports = router;