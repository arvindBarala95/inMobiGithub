#!/usr/bin/env node

/* jslint node: true */
'use strict';
var bodyParser = require('body-parser');
var express = require('express');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql@123',
    database: 'inMobiGithub'
});

// connect to database
db.connect((err) => {
    if (err) {
        console.log("Db connection error :"+err);
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;
var app = express();
app.set('port', 8421);
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb',
    parameterLimit: '5000'
}));
require('./routes')(app);
app.on('error', function (err) {
    process.exit(1);
});


app.listen(app.get('port'), function () {
    console.log("InMobi Github server listening on port " + app.get('port') + ' in ' + app.get('env'));
});

