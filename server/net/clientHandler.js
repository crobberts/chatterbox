const express = require('express');
const path = require('path');
const router = express.Router();
const database = require('../integration/userDAO.js');

const USER_EXISTS_MSG = "Username taken";
const EMPTY_STRING = "";
const PWD_MISMATCH = "The passwords do not match!";
const LOGIN_ERR = "Incorrect username or password";

router.get("/", (req, res) => {
    if (req.session.isLoggedIn) {
        res.redirect("/chat");
    } else {
        res.render("public/index", {ph: EMPTY_STRING,
                                    pwd_err: EMPTY_STRING,
                                    login_err: EMPTY_STRING
                                    });
    }
});

router.get("/chat", (req, res) => {
    if (req.session.isLoggedIn) {
        res.render("public/chat", {username: req.session.username});
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
        .then((result) => {
            res.redirect("/chat");
        });
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
        usrlog,
        pwdlog
    } = req.body;

    database.loginUser(usrlog, pwdlog)
    .then((result) => {
        req.session.username = result[0].username;
        req.session.isLoggedIn = true;

        res.redirect("/chat");
    },
    (err) => {
        res.render("public/index", {ph: EMPTY_STRING,
                                    pwd_err: EMPTY_STRING,
                                    login_err: LOGIN_ERR
                                    });
    });
});

router.get('*', (req, res) => {
    res.render("public/pgnotfound");
});

router.post("logout", (req, res) => {
    if (req.session.isLoggedIn) {
        req.session.isLoggedIn = null;
        req.session.username = null;
    }
});

module.exports = router;
