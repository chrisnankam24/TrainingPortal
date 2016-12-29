/**
 * Created by user on 10/24/2016.
 */

var userModel = require('../models/user'); // For user info
var userPostModel = require('../models/user_post'); // For user info

exports.get_userList = function(req, res){

    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    userModel.user_queryBuilder(start_ts, offset, search, function(err, rows) {
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

exports.get_user = function (req, res) {

    var user_id = req.query.id;

    if(user_id == 'all'){
        userModel.get_all_users(function (err, rows) {
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
        userModel.get_user(user_id, function (err, rows) {
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

exports.add_user = function (req, res) {

    var user = {
        cuid: req.body.user_id,
        firstName: req.body.user_first_name,
        lastName: req.body.user_last_name,
        email: req.body.user_email,
        matricule: req.body.user_matricule,
        number: req.body.user_number,
        employmentDate: req.body.user_employment_date,
        gender: req.body.user_gender,
        contractType: req.body.user_contract,
        userStatus: req.body.user_status,
        bossID: req.body.user_boss,
        userLocationID: req.body.user_location
    };

    userModel.add_user(user, get_callback(req, res));
};

function get_callback(req, res) {

    return function (err, rows) {

        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            var user_id = req.body.user_id;
            var postID = req.body.user_post;

            userPostModel.add_userPostNow(postID, user_id, function (err, rows) {
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

}

exports.update_user = function (req, res) {

    var id = req.body.user_id;
    var user = {
        cuid: req.body.user_id,
        firstName: req.body.user_first_name,
        lastName: req.body.user_last_name,
        email: req.body.user_email,
        matricule: req.body.user_matricule,
        number: req.body.user_number,
        employmentDate: req.body.user_employment_date,
        gender: req.body.user_gender,
        contractType: req.body.user_contract,
        userStatus: req.body.user_status,
        bossID: req.body.user_boss,
        userLocationID: req.body.user_location
    };

    userModel.update_user(id, user, function (err, rows) {
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

exports.delete_user = function (req, res) {

    var user_id = req.query.id;

    userModel.delete_user(user_id, function (err, rows) {
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

exports.get_users_in_services = function (req, res) {

    var services_id = req.body.services_id;

    userModel.get_users_in_services(services_id, function (err, rows) {
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

exports.get_users_in_planned_training = function (req, res) {

    var pt_id = req.body.pt_id;

    userModel.get_users_in_planned_training(pt_id, function (err, rows) {
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

exports.setImage = function(req, res){

    var image_content = req.body.content;

    var image_parts = image_content.split(',');
    var image_header = image_parts[0];
    var image_body = image_parts[1];

    var image_extension = image_header.split(';')[0].split('/')[1];

    console.log(require('path').dirname(require.main.filename));

    require("fs").writeFile(require('path').dirname(require.main.filename) + "/public/images/user_images/" + req.session.data.cuid + '.' + image_extension, image_body, 'base64', function(err) {
        if(err){
            res.status(403).send({
                success: false,
                message: err
            });

        }else{

            userModel.set_user_image(req.session.data.cuid, "/images/user_images/" + req.session.data.cuid + '.' + image_extension, function (err, rows) {
                if(err) {
                    res.status(403).send({
                        success: false,
                        message: err
                    });
                }else{
                    res.json({
                        success: true,
                        data: rows
                    })
                }
            });
        }
    });
};

exports.clearImage = function(req, res){

    userModel.set_user_image(req.session.data.cuid, "none", function (err, rows) {
        if(err) {
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                image: req.session.data.gender == 1 ? "/images/user_images/male.png" : "/images/user_images/female.png",
                message: "Cleared"
            })
        }
    });
};