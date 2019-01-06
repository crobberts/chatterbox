const db = require('mysql');

const con = db.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "chatterbox"
});

/**	
	Tries to connect to database
	@throws 
**/
const connectdb = () => {
    return new Promise((res, rej) => {
        con.connect((err) => {
            if (err) rej(err);

            res("connected to database");
        });
    });
}

/**	
	Tries to register user
	
	@param username - Username that is to be registered for user
	@param password - Password that is to be registered for user
	@throws database_failure - If a query results in an error
	@throws usernameTaken - If the username already exists in the database
	
**/
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
/**	
	Tries to log in, throws appropriate error on database failure or if incorrect password/non-existing user
	
	@param username - User that is trying to log in
	@param password - Password for the user
	@throw - If no matching user found
	
**/
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
