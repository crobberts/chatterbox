const express = require('express');
const app = express();
const server = app.listen(3002);
const io = require('socket.io').listen(server);
const router = require('./net/clientHandler.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("chatmessage", (value) => {
        console.log(value);
        socket.emit("broadcast", {"message": value});
    });

    socket.on("disconnect", () => {
        console.log("a user disconnected");
    });
});

module.exports = app;
