/**
 * Created by user on 11/11/2016.
 */

var resourceModel = require('../models/resource'); // For training info

exports.get_resourceList = function(req, res){
    //group, creation_ts
    var group = req.body.group;
    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    resourceModel.resources_queryBuilder(group, start_ts, offset, search, function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            for(var i = 0; i < rows.length; i++){
                if(rows[i].resourceType == 'Audio'){
                    rows[i].colorCode = '#E0F2F1';
                }else if(rows[i].resourceType == 'Video'){
                    rows[i].colorCode = '#FFF3E0';
                }else if(rows[i].resourceType == 'Document'){
                    rows[i].colorCode = '#FDE3E0';
                }
                else{
                    rows[i].colorCode = '#FFCCBC';
                }
                rows[i].colorCode = 'none';

                rows[i].resourceVisibility = rows[i].resourceVisibility.readUIntBE(0, 1);
            }

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_adminResourceList = function(req, res){
    //group, creation_ts
    var group = req.body.group;
    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    resourceModel.admin_resources_queryBuilder(group, start_ts, offset, search, function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            for(var i = 0; i < rows.length; i++){
                rows[i].can_modif = false;
                if(rows[i].creator == req.session.data.cuid){
                    rows[i].can_modif = true;
                }

                rows[i].resourceVisibility = rows[i].resourceVisibility.readUIntBE(0, 1);
            }

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_resource = function (req, res) {

    var resource_id = req.query.id;

    if(resource_id == 'all'){
        resourceModel.get_all_resources(function (err, rows) {
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
        resourceModel.get_resource(resource_id, function (err, rows) {
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

exports.modify_resource = function (req, res) {

    //resource_id, name, link, type, visibility
    var id = req.body.resource_id;
    var name = req.body.resource_name;
    var link = req.body.resource_link;
    var visibility = req.body.resource_visibility;
    var type = req.body.resource_type;

    if(visibility == '0'){
        visibility = 0;
    }else{
        visibility = 1;
    }

    resourceModel.update_resource(id, name, link, type, visibility, function (err, rows) {
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

exports.add_resource = function (req, res) {

    var name = req.body.resource_name;
    var link = req.body.resource_link;
    var visibility = req.body.resource_visibility;
    var type = req.body.resource_type;
    var creator =  req.session.data.cuid;


    if(visibility == '0'){
        visibility = 0;
    }else{
        visibility = 1;
    }

    resourceModel.insert_resource(name, link, type, visibility, creator, function (err, rows) {
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

exports.delete_resource = function (req, res) {

    var id = req.query.resource_id;

    resourceModel.delete_resource(id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: req
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });

};

exports.increment_view = function (req, res) {

    var resource_id = req.body.resource_id;

    resourceModel.increment_view_resource(resource_id, function (err, rows) {
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
