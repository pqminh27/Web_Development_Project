const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/db_controller");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("*", (req, res, next) => {
    if (req.cookies["username"] == null) res.redirect("/login");
    //fix to just admin
    else next();
});

router.get("/", function(req, res) {
    db.getAllEmployee(function(err, result) {
        res.render("salary.ejs", { employee: result });
    });
});

router.get("/paysalary/:id", function(req, res) {
    const id = req.params.id;
    db.getEmployeeById(id, function(err, result) {
        const name = result[0].name;
        const id = result[0].id;
        const email = result[0].email;
        const role = result[0].role;
        const salary = result[0].salary;
        const join_date = result[0].join_date;
        const contact = result[0].contact;
        res.render("salary.ejs", {
            name: name,
            id: id,
            email: email,
            role: role,
            salary: salary,
            join_date: join_date,
            contact: contact,
        });
    });
});

module.exports = router;