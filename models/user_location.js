/**
 * Created by user on 11/30/2016.
 */
// Import Database connection
database = require('../config/database');

// Retreive database connection
db_conn = database.connection;

exports.userLocation_queryBuilder = function (start_ts, offset, search, callback) {

    var total_query = "SELECT COUNT(*) FROM dv_portal_db.user_location";

    if(search != undefined){
        total_query += " WHERE region LIKE '%" + search + "%' OR";
        total_query += " town LIKE '%" + search + "%' OR";
        total_query += " site LIKE '%" + search + "%'";
    }

    var query = "SELECT t.userLocationID, t.region, t.site, t.town, (" + total_query + ") AS total FROM user_location t ";

    if(search != undefined){
        query += " WHERE t.region LIKE '%" + search + "%' OR";
        query += " t.town LIKE '%" + search + "%' OR";
        query += " t.site LIKE '%" + search + "%'";
    }

    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

//------------- userLocation CRUD Operations ----------------------//
// READ ALL userLocation
exports.get_all_userLocation = function (callback) {
    db_conn.query("SELECT * FROM user_location", callback);
};

// READ a userLocation
exports.get_userLocation = function (userLocation_id, callback) {
    db_conn.query("SELECT * FROM user_location WHERE userLocationID = ?", [userLocation_id], callback);
};

// CREATE a userLocation
exports.add_userLocation = function (site, town, region, callback) {
    var query = "INSERT INTO user_location(region, town, site) VALUES (?, ?, ?)";
    db_conn.query(query, [region, town, site], callback);
};

// UPDATE a userLocation
exports.update_userLocation = function (id, site, town, region, callback) {
    var query = "UPDATE user_location SET region = ?, town = ?, site = ? WHERE userLocationID = ?";
    db_conn.query(query, [region, town, site, id], callback);
};

// DELETE a userLocation
exports.delete_userLocation = function (userLocation_id, callback) {
    var query = "DELETE FROM user_location WHERE userLocationID = " + userLocation_id;
    db_conn.query(query, callback);
};
