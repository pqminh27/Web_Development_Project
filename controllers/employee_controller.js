const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/db_controller");
const multer = require("multer");
const { check, validationResult } = require("express-validator");

const fs = require("fs");
const path = require("path");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("*", (req, res, next) => {
    if (req.cookies["username"] == null) res.redirect("/login");
    else next();
});

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, "public/assets/images/upload_images");
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    db.getAllEmployee(function(err, result) {
        if (err) throw err;
        res.render("employee.ejs", { employee: result });
    });
});

router.get("/add_employee", (req, res) => {
    res.render("add_employee.ejs");
});

router.post(
    "/add_employee",
    check("name").notEmpty(),
    check("email").notEmpty(),
    check("contact").notEmpty(),
    check("date").notEmpty().isEmail().withMessage("Select join date"),
    check("role").notEmpty(),
    check("salary").notEmpty(),
    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        db.addEmployee(
            req.body.name,
            req.body.email,
            req.body.contact,
            req.body.join_date,
            req.body.role,
            req.body.salary,
            function(err, result) {
                console.log("Employee details are added to database");
                res.redirect("/employee");
            }
        );
    }
);

router.get("/edit_employee/:id", function(req, res) {
    const id = req.params.id;
    db.getEmployeeById(id, function(err, result) {
        res.render("edit_employee.ejs", { list: result });
    });
});

router.post("/edit_employee/:id", function(req, res) {
    const id = req.params.id;
    db.editEmployee(
        id,
        req.body.name,
        req.body.email,
        req.body.contact,
        req.body.join_date,
        req.body.role,
        req.body.salary,
        function(err, result) {
            if (err) throw err;
            res.redirect("/employee");
        }
    );
});

router.get("/delete_employee/:id", function(req, res) {
    const id = req.params.id;
    db.getEmployeeById(id, function(err, result) {
        res.render("delete_employee.ejs", { list: result });
    });
});

router.post("/delete_employee/:id", function(req, res) {
    const id = req.params.id;
    db.deleteEmployee(id, function(err, result) {
        res.redirect("/employee");
    });
});

router.get("/", function(req, res) {
    db.getAllEmployee(function(err, result) {
        if (err) throw err;
        res.render("employee.ejs", { list: result });
    });
});

// router.get("/search", function(req, res) {
//     const key = req.body.search;
//     db.searchEmployee(key, function(err, rows, fields) {
//         if (err) throw err;
//         const data = [];
//         for (let i = 0; i < rows; ++i) {
//             data.push(rows[i].first_name);
//         }
//         res.end(JSON.stringify(data));
//     });
// });

router.post("/search", function(req, res) {
    const key = req.body.search;
    db.searchEmployee(key, function(err, result) {
        console.log(result);
        res.render("employee.ejs", { employee: result });
    });
});

module.exports = router;