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

const register = (username, password) => {
    return new Promise((res, rej) =>  {
        let query = `INSERT INTO user (username, password) VALUES ('${username}', '${password}')`;
        con.query(query, (err, result) => {
            if (err) rej(err);

            res(result);
        });
    });
}

const checkName = (username) => {
    return new Promise((res, rej) => {
        let query = "SELECT username FROM user WHERE username = '" + username + "'";
        con.query(query, (err, result) => {
            if (err) throw err;

            if (result.length > 0) {
                rej(result);
            }

            res(result);
        })
    });
}

module.exports = {register, connectdb, checkName};
