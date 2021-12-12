const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/db_controller");
const mysql = require("mysql");
const flash = require("flash");
const { ROLE, authUser, authRole } = require("../authenticateUser");
const {
    canViewProject,
    scopedProjects,
    canDeleteProject,
} = require("../permission");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", authUser, authRole(ROLE.ADMIN), (req, res) => {
    res.render("admin.ejs");
});

module.exports = router;