const mysql = require('mysql')
const expres = require('express')
const router = expres.Router()
require('dotenv').config()

const config = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

config.connect((err) => {
    if (err) throw err;
    else console.log("Database Connected")
})