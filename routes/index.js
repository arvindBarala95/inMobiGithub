'use strict';
var ERROR = require('./error');
var COMMAN = require('./comman');
var user = require('./user');
module.exports = function (app) {
    app.get("/v1/inMobi/gitHub/:user", user.userProfile, COMMAN.response_json, ERROR);
    app.get("/v1/inMobi/gitHub/history/:user", user.userHistory, COMMAN.response_json, ERROR);
    app.post("/v1/inMobi/gitHub/history/:user", user.deleteHistory, COMMAN.response_json, ERROR);

}