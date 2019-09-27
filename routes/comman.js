/* jslint node: true */
'use strict';
var common = {
    response_json: function (req, res, next) {
        var http_status = 200;

        if (req.resp && req.resp.code && req.resp.code == parseInt(req.resp.code)) {
            http_status = req.resp.code;
        }

        res.json(req.resp, http_status);
    }

};

module.exports = common;