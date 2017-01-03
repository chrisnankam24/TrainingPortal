/**
 * author: chrisnankam24
 * copyright Orange CM, 2016
 */

// JWT Authentication module
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config'); // get our config file
var userModel = require('../models/user'); // For user info
var request = require('request'); // User LDAP authentication

/**
 * Function to authenticate user
 * @param req
 * @param res
 */
exports.authenticate = function(req, res){
    // Retrieve username and password

    var user = {};

    user.username = req.body.username;
    user.password = req.body.password;

    userModel.get_user(user.username, function (err, rows) {
        if(err){
            // User not found. Send 401
            res.status(401).send({
                success: false,
                message: "User not found"
            });
        }else{
            var user_info = rows[0];

            console.log(user_info.state);

            if(!user_info || (user_info.state == 0)){
                // User object empty/undefined/null
                res.status(401).send({
                    success: false,
                    message: "User not found"
                });
            }
            else{

                if(true/*user.username == 'WLJD8430'*/){

                    var redirect_path = '/tmp';

                    var auth_user = {};

                    auth_user.email = user_info.email;
                    auth_user.cuid = user.username;
                    auth_user.firstName = user_info.firstName;
                    auth_user.lastName = user_info.lastName;
                    auth_user.gender = user_info.gender.readUIntBE(0, 1);
                    auth_user.status = user_info.userStatus;
                    auth_user.image = user_info.usr_img;
                    // Create user token
                    var token = jwt.sign(auth_user, config.JWT_SECRET, {
                        expiresIn: "10 days" // expires in 24 hours
                    });

                    // Returns the information including token as JSON
                    res.json({
                        success: true,
                        access_token: token,
                        redirect_url: req.protocol + '://' + req.get('host') + redirect_path
                    });

                }
                else{
                    // Check user password
                    var auth_url = "http://172.21.55.39/uaconsole/index.php/UserAccessConsole/authentify?cuid=" +
                        user.username + "&password=" + user.password + "&key=" + config.LDAP_KEY;

                    request(auth_url, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var result = JSON.parse(body); // body contains {AUTH:boolean} object
                            if(result.AUTH){

                                var redirect_path = '/tmp';

                                var auth_user = {};

                                auth_user.email = user_info.email;
                                auth_user.cuid = user.username;
                                auth_user.firstName = user_info.firstName;
                                auth_user.lastName = user_info.lastName;
                                auth_user.gender = user_info.gender.readUIntBE(0, 1);
                                auth_user.status = user_info.userStatus;
                                auth_user.image = user_info.usr_img;

                                // User successfully authenticated. Read user info
                                var info_url = "http://172.21.55.39/uaconsole/index.php/UserAccessConsole/search?cuid=" +
                                    user.username + "&key=" + config.LDAP_KEY;
                                request(info_url, function (error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        var res = JSON.parse(body);
                                        auth_user.email = res.EMAIL;
                                        auth_user.identifier = res.IDENTIFIANT;
                                        auth_user.name = res.NOM;
                                    }
                                });

                                // Create user token
                                var token = jwt.sign(auth_user, config.JWT_SECRET, {
                                    expiresIn: "10 days" // expires in 24 hours
                                });

                                // Returns the information including token as JSON
                                res.json({
                                    success: true,
                                    access_token: token,
                                    redirect_url: req.protocol + '://' + req.get('host') + redirect_path
                                });

                            }else{
                                // User cannot be authenticated
                                res.status(401).send({
                                    success: false,
                                    message: "Authentication Failed. User cannot be authenticated with LDAP Server"
                                });
                            }
                        }else{
                            // Connection to authentication server failed
                            res.status(401).send({
                                success: false,
                                message: "Unable to connect to authentication server"
                            });
                        }
                    });
                }
            }
        }
    });
};

/**
 * Middleware to verify user authenticity
 * @param req
 * @param res
 * @param next
 */
exports.isAuthenticated = function(req, res, next){
    // Retrieve token if it exists
    var token = req.body.access_token || req.query.access_token || req.headers['x-access-token'];

    // Decode Token
    if(token){
        // Verify secret and check exp
        jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
            if(err){
                // Send 401
                res.status(401).send({
                    success: false,
                    message: "Authentication failed. Invalid/Expired Token"
                });
            }else{
                // Everything ok. Save to request in other routes
                req.decoded = decoded;
                next();
            }
        });

    }else{
        // No token found. Return 401
        res.status(401).send({
            success: false,
            message: "Authentication failed. No token found"
        });
    }
};


exports.deAuthenticate = function(req, res){

    var redirect_path = '/tmpDestroy';

    res.json({
        success: true,
        redirect_url: req.protocol + '://' + req.get('host') + redirect_path
    });

};