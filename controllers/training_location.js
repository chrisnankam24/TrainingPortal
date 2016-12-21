/**
 * Created by user on 11/30/2016.
 */
var trainingLocationModel = require('../models/training_location'); // For training info

exports.get_trainingLocationList = function(req, res){

    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    trainingLocationModel.trainingLocation_queryBuilder(start_ts, offset, search, function(err, rows) {
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

exports.get_trainingLocation = function (req, res) {

    var trainingLocation_id = req.query.id;

    if(trainingLocation_id == 'all'){
        trainingLocationModel.get_all_trainingLocation(function (err, rows) {
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
        trainingLocationModel.get_trainingLocation(trainingLocation_id, function (err, rows) {
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

exports.add_trainingLocation = function (req, res) {

    var site = req.body.site;
    var town = req.body.town;
    var region = req.body.region;

    trainingLocationModel.add_trainingLocation(site, town, region, function (err, rows) {
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

exports.update_trainingLocation = function (req, res) {

    var id = req.body.trainingLocation_id;
    var site = req.body.site;
    var town = req.body.town;
    var region = req.body.region;

    console.log(id + ' : ' + site + ' : ' + town + ' : ' + region);

    trainingLocationModel.update_trainingLocation(id, site, town, region, function (err, rows) {
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

exports.delete_trainingLocation = function (req, res) {

    var trainingLocation_id = req.query.id;

    trainingLocationModel.delete_trainingLocation(trainingLocation_id, function (err, rows) {
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