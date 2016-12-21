/**
 * Created by user on 11/16/2016.
 */

var postModel = require('../models/post'); // For Post, Service, Department and direction info

exports.get_postList = function(req, res){
    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    postModel.posts_queryBuilder(start_ts, offset, search, function(err, rows) {
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

exports.get_post = function (req, res) {

    var post_id = req.query.id;

    if(post_id == 'all'){
        postModel.get_all_posts(function (err, rows) {
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
        postModel.get_post(post_id, function (err, rows) {
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

exports.modify_post = function (req, res) {

    var id = req.body.post_id;
    var name = req.body.post_name;
    var level = req.body.post_level;
    var service = req.body.post_service_id;

    postModel.update_post(id, name, level, service, function (err, rows) {
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

exports.add_post = function (req, res) {

    var name = req.body.post_name;
    var level = req.body.post_level;
    var service = req.body.post_service_id;
    var init_trainings = req.body.initial_training;

    postModel.add_post(name, level, service, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            var post_id = rows.insertId;

            if(init_trainings != ''){
                postModel.insert_post_trainings(post_id, init_trainings.split(','), function () {
                    if (err) {
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
                res.json({
                    success: true,
                    data: rows
                });
            }
        }
    });

};

exports.delete_post = function (req, res) {

    var id = req.query.post_id;

    postModel.delete_post(id, function (err, rows) {
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

////////////// Services

exports.get_serviceList = function(req, res){
    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    postModel.services_queryBuilder(start_ts, offset, search, function(err, rows) {
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

exports.get_service = function (req, res) {

    var service_id = req.query.id;

    if(service_id == 'all'){
        postModel.get_all_services(function (err, rows) {
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
        postModel.get_service(service_id, function (err, rows) {
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

exports.add_service = function (req, res) {

    var service_name = req.body.service_name;
    var department_id = req.body.department_id;

    postModel.add_service(service_name, department_id, function (err, rows) {
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

exports.update_service = function (req, res) {

    var service_id = req.body.service_id;
    var service_name = req.body.service_name;
    var department_id = req.body.department_id;

    postModel.update_service(service_id, department_id, service_name, function (err, rows) {
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

exports.delete_service = function (req, res) {

    var service_id = req.query.id;

    postModel.delete_service(service_id, function (err, rows) {
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

////////////// departments


exports.get_departmentList = function(req, res){
    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    postModel.departments_queryBuilder(start_ts, offset, search, function(err, rows) {
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

exports.get_department = function (req, res) {

    var department_id = req.query.id;

    if(department_id == 'all'){
        postModel.get_all_departments(function (err, rows) {
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
        postModel.get_department(department_id, function (err, rows) {
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

exports.add_department = function (req, res) {

    var department_name = req.body.department_name;
    var direction_id = req.body.direction_id;

    postModel.add_department(department_name, direction_id, function (err, rows) {
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

exports.update_department = function (req, res) {

    var department_id = req.body.department_id;
    var department_name = req.body.department_name;
    var direction_id = req.body.direction_id;

    postModel.update_department(department_id, direction_id, department_name, function (err, rows) {
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

exports.delete_department = function (req, res) {

    var department_id = req.query.id;

    postModel.delete_department(department_id, function (err, rows) {
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

////////////// directions

exports.get_directionList = function(req, res){
    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    postModel.directions_queryBuilder(start_ts, offset, search, function(err, rows) {
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

exports.get_direction = function (req, res) {

    var direction_id = req.query.id;

    if(direction_id == 'all'){
        postModel.get_all_directions(function (err, rows) {
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
        postModel.get_direction(direction_id, function (err, rows) {
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

exports.add_direction = function (req, res) {

    var direction_name = req.body.direction_name;

    postModel.add_direction(direction_name, function (err, rows) {
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

exports.update_direction = function (req, res) {

    var direction_id = req.body.direction_id;
    var direction_name = req.body.direction_name;

    postModel.update_direction(direction_id, direction_name, function (err, rows) {
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

exports.delete_direction = function (req, res) {

    var direction_id = req.query.id;

    postModel.delete_direction(direction_id, function (err, rows) {
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