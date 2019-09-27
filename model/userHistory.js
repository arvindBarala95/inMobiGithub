'use strict';
module.exports = {
    get: function (opt, cb) {
        let query;
        if (opt.user_id && opt.user_name) {
            query = "SELECT * FROM `user_history` WHERE user_id = '" + opt.user_id + "' AND `user_name` = '" + opt.user_name + "'";
        } else {
            query = "SELECT * FROM `user_history` WHERE user_id = '" + opt.user_id + "'";
        }
        db.query(query, (err, result) => {
            if (err) {
                console.log("Error while get user history " + err);
                var error = new Error("Internal db error while get user history")
                error.status = 500;
                return cb(error);
            }
            return cb(null, result);
        });
    },
    insert: function (opt, cb) {
        let user_id = opt.user_id;
        let user_name = opt.user_name;
        let query = "SELECT * FROM `user_history` WHERE user_id = '" + user_id + "' AND `user_name` = '" + user_name + "'";
        db.query(query, (err, result) => {
            if (err) {
                console.log("Error while insert user history 1: " + err);
                var error = new Error("Internal db error while insert user history")
                error.status = 500;
                return cb(error);
            }
            else if (result.length > 0) {
                if (result.status = 1) {
                    return cb();
                }
                let query = "UPDATE `user_history` SET `status` = '" + 1 + "' WHERE `user_id` = '" + user_id + "' AND `user_name` = '" + user_name + "'";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log("Error while update user history " + err);
                        var error = new Error("Internal db error while insert user history")
                        error.status = 500;
                        return cb(error);
                    }
                    return cb();
                });

            } else {
                let query = "INSERT INTO `user_history` (user_id,user_name,github_id,avatar_url,type,name,company,email,public_repos,followers,following,status) VALUES ('" + user_id + "', '" + user_name + "', '" + opt.github_id + "', '" + opt.avatar_url + "', '" + opt.type + "', '" + opt.name + "', '" + opt.company + "', '" + opt.email + "', '" + opt.public_repos + "', '" + opt.followers + "', '" + opt.following + "', '" + 1 + "')";
                db.query(query, (err, res) => {
                    if (err) {
                        console.log("Error while insert user history 2: " + err);
                        var error = new Error("Internal db error while insert user history")
                        error.status = 500;
                        return cb(error);
                    }
                    return cb();
                });


            }
        });

    },
    update: function (opt, cb) {
        let user_id = opt.user_id;
        let user_name = opt.user_name;
        let query = "UPDATE `user_history` SET `status` = '" + 0 + "' WHERE `user_id` = '" + user_id + "' AND `user_name` = '" + user_name + "'";
        db.query(query, (err, result) => {
            if (err) {
                console.log("Error while delete user history " + err);
                var error = new Error("Internal db error while delete user history")
                error.status = 500;
                return cb(error);
            }
            return cb();
        });

    }

};