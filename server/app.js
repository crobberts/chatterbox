const express = require('express');
const app = express();
const server = app.listen(3002);
const io = require('socket.io').listen(server);
const router = require('./net/clientHandler.js');
const bodyParser = require('body-parser');
const dbconn = require('./integration/userDAO.js');

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

io.on("connection", (socket) => {

    socket.on("joined", (username) => {
        io.sockets.emit(username + " has joined the server");
    });

    socket.on("chatmessage", (value) => {
        io.sockets.emit("broadcast", {"message": value});
    });

    socket.on("disconnect", () => {
    });
});

dbconn.connectdb();

module.exports = app;
