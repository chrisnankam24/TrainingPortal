/**
 * Created by user on 11/30/2016.
 */
// Import Database connection
database = require('../config/database');

// Retreive database connection
db_conn = database.connection;

exports.trainingLocation_queryBuilder = function (start_ts, offset, search, callback) {
    var total_query = "SELECT COUNT(*) FROM dv_portal_db.training_location";

    if(search != undefined){
        total_query += " WHERE region LIKE '%" + search + "%' OR";
        total_query += "  town LIKE '%" + search + "%' OR";
        total_query += "  site LIKE '%" + search + "%'";
    }

    var query = "SELECT t.trainingLocationID, t.region, t.site, t.town, (" + total_query + ") AS total FROM training_location t ";

    if(search != undefined){
        query += " WHERE t.region LIKE '%" + search + "%' OR";
        query += " t.town LIKE '%" + search + "%' OR";
        query += " t.site LIKE '%" + search + "%'";
    }

    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

//------------- trainingLocation CRUD Operations ----------------------//
// READ ALL trainingLocation
exports.get_all_trainingLocation = function (callback) {
    db_conn.query("SELECT * FROM training_location", callback);
};

// READ a trainingLocation
exports.get_trainingLocation = function (trainingLocation_id, callback) {
    db_conn.query("SELECT * FROM training_location WHERE trainingLocationID = ?", [trainingLocation_id], callback);
};

// CREATE a trainingLocation
exports.add_trainingLocation = function (site, town, region, callback) {
    var query = "INSERT INTO training_location(region, town, site) VALUES (?, ?, ?)";
    db_conn.query(query, [region, town, site], callback);
};

// UPDATE a trainingLocation
exports.update_trainingLocation = function (id, site, town, region, callback) {
    var query = "UPDATE training_location SET region = ?, town = ?, site = ? WHERE trainingLocationID = ?";
    db_conn.query(query, [region, town, site, id], callback);
};

// DELETE a trainingLocation
exports.delete_trainingLocation = function (trainingLocation_id, callback) {
    var query = "DELETE FROM training_location WHERE trainingLocationID = " + trainingLocation_id;
    db_conn.query(query, callback);
};
