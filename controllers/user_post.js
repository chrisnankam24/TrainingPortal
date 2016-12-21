/**
 * Created by user on 11/30/2016.
 */
var userPostModel = require('../models/user_post'); // For user info

exports.get_userPostList = function(req, res){

    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    userPostModel.userPost_queryBuilder(start_ts, offset, search, function(err, rows) {
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

exports.get_userPost = function (req, res) {

    var user_id = req.query.id;

    if(user_id == 'all'){
        userPostModel.get_all_userPost(function (err, rows) {
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
        userPostModel.get_userPost(user_id, function (err, rows) {
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

exports.add_userPost = function (req, res) {

    var postID = req.body.postID;
    var user_id = req.body.user_id;
    var assignationDate = req.body.assignationDate;

    userPostModel.add_userPost(postID, user_id, assignationDate, function (err, rows) {
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