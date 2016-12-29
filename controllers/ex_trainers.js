/**
 * Created by user on 12/1/2016.
 */
var exTrainerModel = require('../models/ex_trainers'); // For training info

exports.get_exTrainerList = function(req, res){

    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    exTrainerModel.exTrainer_queryBuilder(start_ts, offset, search, function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            for(var i = 0; i < rows.length; i++){
                rows[i].gender = rows[i].gender.readUIntBE(0, 1);
            }

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_exTrainer = function (req, res) {

    var exTrainer_id = req.query.id;

    if(exTrainer_id == 'all'){
        exTrainerModel.get_all_exTrainer(function (err, rows) {
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
        exTrainerModel.get_exTrainer(exTrainer_id, function (err, rows) {
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

exports.add_exTrainer = function (req, res) {

    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var gender = req.body.gender;

    exTrainerModel.add_exTrainer(first_name, last_name, gender, function (err, rows) {
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

exports.update_exTrainer = function (req, res) {

    var id = req.body.ex_trainer_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var gender = req.body.gender;

    exTrainerModel.update_exTrainer(id, first_name, last_name, gender, function (err, rows) {
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

exports.delete_exTrainer = function (req, res) {

    var exTrainer_id = req.query.id;

    exTrainerModel.delete_exTrainer(exTrainer_id, function (err, rows) {
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