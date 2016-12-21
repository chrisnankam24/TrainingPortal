/**
 * Created by user on 11/16/2016.
 */

var subsModel = require('../models/subsidiaries'); // For training info

//////////////// Transmission Mode

exports.get_trans_mode = function (req, res) {

    var tm_id = req.query.id;

    if(tm_id == 'all'){
        subsModel.get_all_trans_mode(function (err, rows) {
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
        subsModel.get_trans_mode(tm_id, function (err, rows) {
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

exports.add_trans_mode = function (req, res) {

    var trans_mode = req.body.trans_mode;

    subsModel.add_trans_mode(trans_mode, function (err, rows) {
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

exports.update_trans_mode = function (req, res) {

    var tm_id = req.body.tm_id;
    var trans_mode = req.body.trans_mode;

    subsModel.update_trans_mode(tm_id, trans_mode, function (err, rows) {
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

exports.delete_trans_mode = function (req, res) {

    var tm_id = req.body.tm_id;

    subsModel.delete_trans_mode(tm_id, function (err, rows) {
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

//////////////// Training Type

exports.get_training_type = function (req, res) {

    var tt_id = req.query.id;

    if(tt_id == 'all'){
        subsModel.get_all_training_type(function (err, rows) {
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
        subsModel.get_training_type(tt_id, function (err, rows) {
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

exports.add_training_type = function (req, res) {

    var training_type = req.body.training_type;

    subsModel.add_training_type(training_type, function (err, rows) {
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

exports.update_training_type = function (req, res) {

    var tt_id = req.body.tt_id;
    var training_type = req.body.training_type;

    subsModel.update_training_type(tt_id, training_type, function (err, rows) {
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

exports.delete_training_type = function (req, res) {

    var tt_id = req.body.tt_id;

    subsModel.delete_training_type(tt_id, function (err, rows) {
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

//////////////// Training Audience

exports.get_training_aud = function (req, res) {

    var ta_id = req.query.id;

    if(ta_id == 'all'){
        subsModel.get_all_training_aud(function (err, rows) {
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
        subsModel.get_training_aud(tt_id, function (err, rows) {
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

exports.add_training_aud = function (req, res) {

    var training_aud = req.body.training_aud;

    subsModel.add_training_aud(training_aud, function (err, rows) {
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

exports.update_training_aud = function (req, res) {

    var ta_id = req.body.ta_id;
    var training_aud = req.body.training_aud;

    subsModel.update_training_aud(ta_id, training_aud, function (err, rows) {
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

exports.delete_training_aud = function (req, res) {

    var ta_id = req.body.ta_id;

    subsModel.delete_training_aud(ta_id, function (err, rows) {
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


//////////////// Training Location

exports.get_training_loc = function (req, res) {

    var tl_id = req.query.id;

    if(tl_id == 'all'){
        subsModel.get_all_training_loc(function (err, rows) {
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
        subsModel.get_training_loc(tl_id, function (err, rows) {
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

exports.add_training_loc = function (req, res) {

    var region = req.body.region;
    var town = req.body.town;
    var site = req.body.site;

    subsModel.add_training_loc(region, town, site, function (err, rows) {
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

exports.update_training_loc = function (req, res) {

    var tl_id = req.body.tl_id;
    var region = req.body.region;
    var town = req.body.town;
    var site = req.body.site;

    subsModel.update_training_loc(tl_id, region, town, site, function (err, rows) {
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

exports.delete_training_loc = function (req, res) {

    var tl_id = req.body.tl_id;

    subsModel.delete_training_loc(tl_id, function (err, rows) {
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

//////////////// Evaluation Form

exports.get_eval_form = function (req, res) {

    var ef_id = req.query.id;

    if(ef_id == 'all'){
        subsModel.get_all_eval_form(function (err, rows) {
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
        subsModel.get_eval_form(ef_id, function (err, rows) {
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

exports.add_eval_form = function (req, res) {

    var form_name = req.body.form_name;

    subsModel.add_eval_form(form_name, function (err, rows) {
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

exports.update_eval_form = function (req, res) {

    var ef_id = req.body.ef_id;
    var form_name = req.body.form_name;

    subsModel.update_eval_form(ef_id, form_name, function (err, rows) {
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

exports.delete_eval_form = function (req, res) {

    var ef_id = req.body.ef_id;

    subsModel.delete_eval_form(ef_id, function (err, rows) {
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

//////////////// Training Sub Category

exports.get_sub_category = function (req, res) {

    var tt_id = req.query.id;

    if(tt_id == 'all'){
        subsModel.get_all_sub_category(function (err, rows) {
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
        subsModel.get_sub_category(tt_id, function (err, rows) {
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

exports.add_sub_category = function (req, res) {

    var sub_category = req.body.sub_category;

    subsModel.add_sub_category(sub_category, function (err, rows) {
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

exports.update_sub_category = function (req, res) {

    var tt_id = req.body.tt_id;
    var sub_category = req.body.sub_category;

    subsModel.update_sub_category(tt_id, sub_category, function (err, rows) {
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

exports.delete_sub_category = function (req, res) {

    var tt_id = req.body.tt_id;

    subsModel.delete_sub_category(tt_id, function (err, rows) {
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