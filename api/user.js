'use strict';
var userModel = require('../model/user');
var userHisotryModel = require('../model/userHistory');
var Request = require('request');
module.exports = {
    getUserProfile: function (userOpt, cb) {
        let userId = null;
        userModel.get(userOpt.user, function (err, res) {
            if (err) {
                return cb(err);
            } else if (res && res.length == 0) {
                return getUserFromGithub();
            }
            userId = res[0].id;
            userHisotryModel.get({ user_id: res[0].id, user_name: userOpt.gitHubUser }, function (error, result) {
                if (error) {
                    return cb(error);
                } else if (result && result.length > 0) {
                    return cb(null, result[0]);
                }
                return getUserFromGithub();

            });
        });
        function getUserFromGithub() {
            let opt = {
                url: 'https://api.github.com/users/' + userOpt.gitHubUser,
                headers: {
                    client_id: '8425532a9ae3bdfcb0ed',
                    client_secret: 'a619a04c934b3fb83e4c695560ef0db3a295a2ef7',
                    "User-Agent": "gillu"
                },
                json: true,
                timeout: 5000
            }
            console.log(" Request options is for github :" + JSON.stringify(opt));
            Request(opt, function (err, res, body) {
                if (err || !res || (res.body && res.body.length == 0)) {
                    console.log("Error while getting user infro from github " + err);
                    var error = new Error("Error while getting user info")
                    error.status = 500;
                    return cb(error);
                }
                let opt = {
                    user_id: userId,
                    user_name: body.login,
                    github_id: body.node_id,
                    avatar_url: body.avatar_url,
                    type: body.type,
                    name: body.name,
                    company: body.company,
                    email: body.email,
                    public_repos: body.public_repos,
                    followers: body.followers,
                    following: body.following
                }
                if (userId == null) {
                    userModel.insert(userOpt.user, function (error, resp) {
                        if (error || !resp) {
                            return cb(error || new Error("Error while register new User", 500));
                        }
                        opt.user_id = resp;
                        return registerUserHistory(opt);
                    })
                } else {
                    return registerUserHistory(opt);
                }

            });
        }
        function registerUserHistory(opt) {
            userHisotryModel.insert(opt, function (err, res) {
                if (err) {
                    return cb(err);
                }
                return cb(null, opt);
            });

        }



    },
    userHistory: function (user, cb) {
        userModel.get(user, function (err, res) {
            if (err) {
                return cb(err);
            }
            userHisotryModel.get({ user_id: res[0].id }, function (error, result) {
                if (error) {
                    return cb(error);
                }
                return cb(null, result);
            });
        });


    },
    deleteHistory: function (userOpt, cb) {
        userModel.get(userOpt.user, function (err, res) {
            if (err) {
                return cb(err);
            }
            userHisotryModel.update({ user_id: res[0].id, user_name: userOpt.user_name }, function (error, result) {
                if (error) {
                    return cb(error);
                }
                return cb(null, {"msg":"Succesfully delete history for given user"});

            });
        });
    }

}