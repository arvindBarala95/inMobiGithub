'use strict';
var userApi = require('../api/user');
module.exports = {
    userProfile: function (req, res, next) {
        var user = req.params.user;
        var gitHubUser = req.query.gitHubUser;
        if (user == undefined || user == null || user.length == 0) {
            let err = new Error("Given user is not valid");
            err.status = 417;
            return next(err);
        }
        if (gitHubUser == undefined || gitHubUser == null || gitHubUser.length == 0) {
            let err = new Error("Given gitHubUser is not valid");
            err.status = 417;
            return next(err);
        }
        userApi.getUserProfile({ user: user, gitHubUser: gitHubUser }, function (err, res) {
            if (err) {
                return next(err);
            }
            req.resp = res;
            return next();

        });
    },
    userHistory: function (req, res, next) {
        var user = req.params.user;
        if (user == undefined || user == null || user.length == 0) {
            let err = new Error("Given user is not valid");
            err.status = 417;
            return next(err);
        }
        userApi.userHistory(user, function (err, res) {
            if (err) {
                return next(err);
            }
            req.resp = res;
            return next();

        });

    },
    deleteHistory: function (req, res, next) {
        var user = req.params.user;
        var userName = req.body.user;
        if (user == undefined || user == null || user.length == 0) {
            let err = new Error("Given user is not valid");
            err.status = 417;
            return next(err);
        }
        if (userName == undefined || userName == null || userName.length == 0) {
            let err = new Error("Given user is not valid");
            err.status = 417;
            return next(err);
        }
        var userOpt = {
            user: user,
            userName: userName
        }
        userApi.deleteHistory(userOpt, function (err, res) {
            if (err) {
                return next(err);
            }
            req.resp = res;
            return next();

        });

    }
}