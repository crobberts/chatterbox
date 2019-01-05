const express = require('express');
const session = require('express-session');
const router = require('./net/clientHandler.js');
const bodyParser = require('body-parser');
const dbconn = require('./integration/userDAO.js');

const app = express();
const server = app.listen(3002);
const io = require('socket.io').listen(server);
require('./net/websocket-communication.js')(io);

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(session({secret: 'harambe', saveUninitialized: false, resave: false}));
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

try {
    dbconn.connectdb((res) => console.log(res));
} catch(err) {
    console.log("could not connect to database");
}

module.exports = app;
