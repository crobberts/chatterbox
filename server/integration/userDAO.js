const db = require('mysql');

const con = db.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "chatterbox"
});

const connectdb = () => {
    con.connect((err) => {
        if (err) throw err;
        console.log("connected to database");
    });
}

const register = (username, password, callback) => {
    let query = `INSERT INTO user (username, password) VALUES ('${username}', '${password}')`;
    con.query(query, (err, result) => {
        callback(result);
    });
}

const checkName = (username) => {
    //let query = "SELECT username FROM user WHERE username = '" + username + "'";
}

module.exports = {register, connectdb, checkName};
