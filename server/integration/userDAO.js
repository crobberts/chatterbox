const db = require('mysql');

const con = db.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "chatterbox"
});

const connectdb = (callback) => {
    con.connect((err) => {
        if (err) return callback(err);

        callback("connected to database");
    });
}

const register = (username, password) => {
    return new Promise((res, rej) =>  {
        let query = `INSERT INTO user (username, password) VALUES (?, ?)`;
        let inserts = [username,password];
        con.query(query, inserts,(err, result) => {
            if (err) throw error;

            res(result);
        });
    });
}

const checkName = (username) => {
    return new Promise((res, rej) => {
        let query = "SELECT username FROM user WHERE username = ? ";
        con.query(query, username, (err, result) => {
            if (err) throw err;

            if (result.length > 0) {
                rej(result);
            }

            res(result);
        })
    });
}

const loginUser = (username,password) => {
    return new Promise((res, rej) => {
        let query = "SELECT username FROM user WHERE username = ? AND password = ?";
        let inserts = [username,password];
        con.query(query, inserts, (err, result) =>{
            if (err) throw err;

            if(result.length<=0) {
                rej(result);
            }

            res(result);
        })
    });
}


module.exports = {register, connectdb, checkName, loginUser};
