'use strict';
module.exports = {
    insert: function (user, cb) {
        let usernameQuery = "SELECT * FROM `user` WHERE user_name = '" + user + "'";
        db.query(usernameQuery, (err, result) => {
            if (err) {
                console.log("Error while get user info " + err);
                var error = new Error("Internal db error while get user")
                error.status = 500;
                return cb(error);
            }
            else if (result.length > 0) {
                return cb();
            } else {
                let query = "INSERT INTO `user` (user_name) VALUES ('" + user + "')";
                db.query(query, (err, res) => {
                    if (err) {
                        console.log("Error while get user info " + err);
                        var error = new Error("Internal db error while adding user")
                        error.status = 500;
                        return cb(error);
                    }
                    return cb(null, res.insertId);
                });
            }
        });
    },
    get: function (user, cb) {
        let usernameQuery = "SELECT * FROM `user` WHERE user_name = '" + user + "'";
        db.query(usernameQuery, (err, result) => {
            if (err) {
                console.log("Error while get user info " + err);
                var error = new Error("Internal db error while get user")
                error.status = 500;
                return cb(error);
            }
            return cb(null, result);
        });
    }
};