const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    console.log("i requested this again");
    res.sendfile("index.html");
});

module.exports = router;
