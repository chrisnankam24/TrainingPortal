/**
 * Created by user on 11/30/2016.
 */
var userLocationModel = require('../models/user_location'); // For user info

exports.get_userLocationList = function(req, res){

    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    userLocationModel.userLocation_queryBuilder(start_ts, offset, search, function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_userLocation = function (req, res) {

    var userLocation_id = req.query.id;

    if(userLocation_id == 'all'){
        userLocationModel.get_all_userLocation(function (err, rows) {
            if(err){
                // Error querying DB
                res.status(403).send({
                    success: false,
                    message: err
                });
            }else{
                res.json({
                    success: true,
                    data: rows
                });
            }
        });
    }else{
        userLocationModel.get_userLocation(userLocation_id, function (err, rows) {
            if(err){
                // Error querying DB
                res.status(403).send({
                    success: false,
                    message: err
                });
            }else{
                res.json({
                    success: true,
                    data: rows
                });
            }
        });
    }
};

exports.add_userLocation = function (req, res) {

    var site = req.body.site;
    var town = req.body.town;
    var region = req.body.region;

    userLocationModel.add_userLocation(site, town, region, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.update_userLocation = function (req, res) {

    var id = req.body.userLocation_id;
    var site = req.body.site;
    var town = req.body.town;
    var region = req.body.region;

    console.log(id + ' : ' + site + ' : ' + town + ' : ' + region);

    userLocationModel.update_userLocation(id, site, town, region, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.delete_userLocation = function (req, res) {

    var userLocation_id = req.query.id;

    userLocationModel.delete_userLocation(userLocation_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};