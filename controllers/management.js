/**
 * Created by user on 11/14/2016.
 */

var userModel = require('../models/user'); // For user info

exports.get_subsList = function (req, res) {

    var cuid =  req.session.data.cuid;
    var offset = req.body.offset;
    var search = req.body.search;

    userModel.get_subordinates(cuid, offset, search, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            for(var i = 0; i < rows.length; i++){
                rows[i].gender = rows[i].gender.readUIntBE(0, 1);
                rows[i].usr_img = rows[i].usr_img != 'none' ? rows[i].usr_img : rows[i].gender == 1 ? "/images/user_images/male.png" : "/images/user_images/female.png";
            }

            res.json({
                success: true,
                data: rows
            });
        }
    });

};

exports.get_subs_details = function (req, res) {

    var cuid =  req.body.user_id;

    userModel.get_subs_details(cuid, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            rows[0].gender = rows[0].gender.readUIntBE(0, 1);
            rows[0].usr_img = rows[0].usr_img != 'none' ? rows[0].usr_img : rows[0].gender == 1 ? "/images/user_images/male.png" : "/images/user_images/female.png";

            res.json({
                success: true,
                data: rows[0]
            });
        }
    });

};