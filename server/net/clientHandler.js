const express = require('express');
const path = require('path');
const router = express.Router();
const database = require('../integration/userDAO.js');

const USER_EXISTS_MSG = "Username taken";
const EMPTY_STRING = "";
const PWD_MISMATCH = "The passwords do not match!";
const LOGIN_ERR = "Incorrect username or password";

let loggedIn = true;
router.get("/", (req, res) => {
    res.render("public/index", {ph: EMPTY_STRING,
                                pwd_err: EMPTY_STRING,
                                login_err: EMPTY_STRING
                                });
});

router.post("/login", (req, res) => {
    const {
        usr,
        pwd
    } = req.body;
});

router.get("/chat", (req, res) => {
    if (loggedIn) {
        res.render("public/chat");
        return;
    }

    res.redirect("/");
});


router.post("/signup", (req, res) => {
    const {
        usr,
        pwd,
        confirm
    } = req.body;

    if (pwd !== confirm) {
        res.render("public/index", {ph: EMPTY_STRING,
                                    pwd_err: PWD_MISMATCH,
                                    login_err: EMPTY_STRING
                                    });
        return;
    }

    database
    .checkName(usr)
    .then((result) => {
        database.register(usr, pwd)
        .then((result) => res.redirect("/chat"));
    }, (err) => {
        res.render("public/index", {ph: USER_EXISTS_MSG,
                                    pwd_err: EMPTY_STRING,
                                    login_err: EMPTY_STRING
                                    });
    })
    .catch((err) => {
        console.log(err);
    })
});

router.post("/loginUser", (req, res) => {
    const {
        usr,
        pwd
    } = req.body;

    database.loginUser(usr, pwd)
    .then((result)=> {
        res.redirect("/chat");
    },
    (err)=>{
        res.render("public/index", {ph: EMPTY_STRING,
                                    pwd_err: EMPTY_STRING,
                                    login_err: LOGIN_ERR
                                    });
    });
});

module.exports = router;
