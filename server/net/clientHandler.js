const express = require('express');
const path = require('path');
const router = express.Router();
const database = require('../integration/userDAO.js');
let staticPath = "static/public/pages/";
let loggedIn = true;
router.get("/", (req, res) => {
    res.sendfile(path.resolve("static/public/pages/login.html"));
});

router.post("/login", (req, res) => {
    const {
        usr,
        pwd
    } = req.body;
});

router.get("/chat", (req, res) => {
    if (loggedIn) {
        res.sendfile(path.resolve("static/public/pages/index.html"));
        return;
    }

    res.redirect("/");
});

router.post("/signup", (req, res) => {
    const {
        usr,
        pwd
    } = req.body;
    
    database.register(usr, pwd, (result) => {
        console.log(result);
    });
});

module.exports = router;
