const express = require('express');
const path = require('path');
const router = express.Router();
const database = require('../integration/userDAO.js');

const USER_EXISTS_MSG = "Username taken";
const EMPTY_STRING = "";
const PWD_MISMATCH = "The passwords do not match!";
const LOGIN_ERR = "Incorrect username or password";
const DATABASE_CONN_ERR = "Internal error";

const LOGIN_URL = "/";
const CHAT_URL = "/chat";
const SIGN_UP_URL = "/signup";
const LOGIN_USER_URL = "/loginUser";
const LOGOUT_URL = "/lougout";
const DOES_NOT_EXIST_URL = "*";


/**
  @param LOGIN_URL - url of the login page
 
  @callback - User will be shown the log in page when requesting the log in page.
	If they are already logged in, they will be redirected to the chat page
**/
router.get(LOGIN_URL, (req, res) => {

    if (req.session.isLoggedIn) {
        res.redirect(CHAT_URL);
    } else {
        res.render("public/index", {ph: EMPTY_STRING,
                                    pwd_err: EMPTY_STRING,
                                    login_err: EMPTY_STRING
                                    });
    }
});

/**
	@param CHAT_URL - url of the chat page
	
	@callback - User will be redirected to the log in page if they are not logged in.
		If user is logged in, the chat page will be rendered.
**/
router.get(CHAT_URL, (req, res) => {
    if (req.session.isLoggedIn) {
        res.render("public/chat", {username: req.session.username});
        return;
    }

    res.redirect(LOGIN_URL);
});

/**
	@param SIGN_UP_URL - url of the sign up request
	
	@callback - The user will be registered and logged in if the input is valid.
		If the username was taken, passwords did not match or there was a database problem, 
		the user will get an appropriate error message.
**/
router.post(SIGN_UP_URL, (req, res) => {
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
    .register(usr, pwd)
    .then((res) => {
        res.render("public/chat");
    })
    .catch((err) => {
        if (err.database_failure) {
            res.render("public/index", {ph: DATABASE_CONN_ERR,
                                        pwd_err: EMPTY_STRING,
                                        login_err: EMPTY_STRING
                                        });
        } else {
            res.render("public/index", {ph: USER_EXISTS_MSG,
                                        pwd_err: EMPTY_STRING,
                                        login_err: EMPTY_STRING
                                        })
        }
    })
});

/**
	@param LOGIN_USER_URL - url of the login request
	
	@callback - User is logged in if username and password are correct.
		If the input is incorrect, an appropriate error message is displayed.
**/
router.post(LOGIN_USER_URL, (req, res) => {
    const {
        usrlog,
        pwdlog
    } = req.body;

    database.loginUser(usrlog, pwdlog)
    .then((result) => {
        req.session.username = result[0].username;
        req.session.isLoggedIn = true;

        res.redirect(CHAT_URL);
    },
    () => {
        res.render("public/index", {ph: EMPTY_STRING,
                                    pwd_err: EMPTY_STRING,
                                    login_err: LOGIN_ERR
                                    });
    })
    .catch(() => {
        res.render("public/index", {ph: DATABASE_ERR,
                                    pwd_err: EMPTY_STRING,
                                    login_err: LOGIN_ERR
                                    });
    });
});
/**
	@param DOES_NOT_EXIST_URL - url of the login request
	
	@callback - 404 page not found is rendered.
**/

router.get(DOES_NOT_EXIST_URL, (req, res) => {
    res.render("public/pgnotfound");
});

/**
	@param LOGOUT_URL - url of the logout request
	
	@callback - User is logged out.
**/

router.post(LOGOUT_URL, (req, res) => {
    if (req.session.isLoggedIn) {
        req.session.isLoggedIn = null;
        req.session.username = null;
        res.redirect(LOGIN_URL);
    }
});

module.exports = router;
