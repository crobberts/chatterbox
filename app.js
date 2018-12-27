const express = require('express');
const app = express();
const server = app.listen(3002);
const io = require('socket.io').listen(server);
const router = require('./net/clientHandler.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

const connectedClients = {};

io.on("connection", (socket) => {

    socket.on("joined", (username) => {
        
    });

    socket.on("chatmessage", (value) => {
        io.sockets.emit("broadcast", {"message": value, "username":});
    });

    socket.on("disconnect", () => {
    });
});

module.exports = app;
