const db = require('mysql');

const con = db.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "chatterbox"
});

const connectdb = () => {
    return new Promise((res, rej) => {
        con.connect((err) => {
            if (err) rej(err);

            res("connected to database");
        });
    });
}

const register = (username, password) => {
    return new Promise((res, rej) => {
        let query = "SELECT username FROM user WHERE username = ? ";
        con.query(query, username, (err, result) => {
            if (err) {
                rej({database_failure: true});
                return;
            }

            if (result.length > 0) {
                rej({usernameTaken: true});
            }

            query = `INSERT INTO user (username, password) VALUES (?, ?)`;
            let inserts = [username,password];
            con.query(query, inserts, (err, result) => {
                if (err) {
                    rej({database_failure: true});
                    return;
                }

                res();
            });
        });
    });
}

const loginUser = (username,password) => {
    return new Promise((res, rej) => {
        let query = "SELECT username FROM user WHERE username = ? AND password = ?";
        let inserts = [username,password];
        con.query(query, inserts, (err, result) => {
            if (err) {
                rej(err);
                return;
            };

            if(result.length<=0) {
                rej(result);
                return;
            }

            res(result);
        })
    });
}

module.exports = {register, connectdb, loginUser};
