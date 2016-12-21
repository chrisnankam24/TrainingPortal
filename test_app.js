/**
 * author: chrisnankam24
 * copyright Orange CM, 2016
 */

// Required Packages
var express = require('express');
var request = require('request');
var authController = require('./controllers/auth');
var bodyParser = require('body-parser');

var config = require('./config/config'); // get our config file
var userModel = require('./models/user'); // For user info$

userModel.get_user("WLJD8430", function (err, rows) {
    console.log(rows);
});
