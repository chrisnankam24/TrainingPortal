/**
 * Created by user on 11/11/2016.
 */

/**
 * Created by user on 11/11/2016.
 */
// Import Database connection
database = require('../config/database');

// Retreive database connection
db_conn = database.connection;

//------------- User Quiz processes ---------------//

function buildResourceQuery(query, group, start_ts, search) {
    var connector = " WHERE ";

    if (group != 'all') {
        if (group == 'document') {
            query += connector + "rv.resourceType = 'document' ";
            connector = " AND ";
        } else if (group == 'multimedia') {
            query += connector + "rv.resourceType = 'audio' OR rv.resourceType = 'video'";
            connector = " AND ";
        }else if (group == 'forms') {
            query += connector + "rv.resourceType = 'form'";
            connector = " AND ";
        }
    }
    if(start_ts != 'none'){
        query += connector + "rv.addition_date >= str_to_date('" + start_ts + "','%Y-%m-%d')";
    }

    if(search != undefined){
        query += connector + "rv.resource_name LIKE '%" + search + "%'";
    }

    query += connector + "rv.resourceVisibility = 0";

    return query;
}

// READ ALL resource
exports.resources_queryBuilder = function (group, start_ts, offset, search, callback) {
    var total_query = "SELECT COUNT(*) FROM dv_portal_db.resources_view rv";

    total_query = buildResourceQuery(total_query, group, start_ts, search);

    var query = "SELECT rv.`resourceID`, rv.link, rv.`addition_date`, rv.resource_name, rv.num_downloads," +
        " rv.`resourceVisibility`, rv.`resourceType`, (" + total_query + ") AS total FROM dv_portal_db.resources_view rv";

    query = buildResourceQuery(query, group, start_ts, search);

    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

function buildAdminResourceQuery(query, group, start_ts, search) {
    var connector = " WHERE ";

    if (group != 'all') {
        if (group == 'document') {
            query += connector + "rv.resourceType = 'document' ";
            connector = " AND ";
        } else if (group == 'multimedia') {
            query += connector + "rv.resourceType = 'audio' OR rv.resourceType = 'video'";
            connector = " AND ";
        }else if (group == 'forms') {
            query += connector + "rv.resourceType = 'form'";
            connector = " AND ";
        }
    }
    if(start_ts != 'none'){
        query += connector + "rv.addition_date >= str_to_date('" + start_ts + "','%Y-%m-%d')";
    }

    if(search != undefined){
        query += connector + "rv.resource_name LIKE '%" + search + "%'";
    }

    return query;
}

// READ ALL resource
exports.admin_resources_queryBuilder = function (group, start_ts, offset, search, callback) {
    var total_query = "SELECT COUNT(*) FROM dv_portal_db.resources_view rv";

    total_query = buildAdminResourceQuery(total_query, group, start_ts, search);

    var query = "SELECT rv.`resourceID`, rv.link, rv.`addition_date`, rv.resource_name, rv.num_downloads," +
        " rv.`resourceVisibility`, rv.`resourceType`, (" + total_query + ") AS total FROM dv_portal_db.resources_view rv";

    query = buildAdminResourceQuery(query, group, start_ts, search);

    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

exports.update_resource = function (resource_id, name, link, type, visibility, callback) {

    var query = "UPDATE resource SET resource_name = ?, link = ?, resourceType = ?, resourceVisibility = ? WHERE resourceID = ?";

    db_conn.query(query,[name, link, type, visibility, resource_id], callback);

};

exports.insert_resource = function (name, link, type, visibility, callback) {

    var query = "INSERT INTO resource(resource_name, link, resourceType, resourceVisibility, addition_date) VALUES " +
        "(?, ?, ?, ?, NOW())";

    db_conn.query(query,[name, link, type, visibility], callback);

};

exports.delete_resource = function (resource_id, callback) {

    var query = "DELETE FROM resource WHERE resourceID = " + resource_id;

    db_conn.query(query, callback);

};

// READ ALL resource
exports.get_all_resources = function (callback) {
    db_conn.query("SELECT * FROM resource", callback);
};

// READ a resource
exports.get_resource = function (resource_id, callback) { // resourceID to read from DB
    db_conn.query("SELECT * FROM resource WHERE resourceID = ?", [resource_id], callback);
};

exports.increment_view_resource = function (resource_id, callback) {

    var query = "UPDATE resource SET num_downloads = num_downloads + 1 WHERE resourceID = " + resource_id;

    db_conn.query(query, callback);

};