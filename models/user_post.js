/**
 * Created by user on 12/1/2016.
 */
/**
 * Created by user on 11/30/2016.
 */
// Import Database connection
database = require('../config/database');

// Retreive database connection
db_conn = database.connection;

exports.userPost_queryBuilder = function (start_ts, offset, search, callback) {

    var total_query = "SELECT COUNT(*) FROM dv_portal_db.admin_user_current_post_view";

    if(search != undefined){
        total_query += " WHERE cuid LIKE '%" + search + "%' OR";
        total_query += " firstName LIKE '%" + search + "%' OR";
        total_query += " lastName LIKE '%" + search + "%' OR";
        total_query += " post_name LIKE '%" + search + "%'";
    }

    var query = "SELECT ucpv.cuid, ucpv.post_name, ucpv._postID, ucpv.firstName, ucpv.lastName, ucpv.assignationDate, (" + total_query + ") AS total FROM admin_user_current_post_view ucpv";

    if(search != undefined){
        query += " WHERE ucpv.cuid LIKE '%" + search + "%' OR";
        query += " ucpv.firstName LIKE '%" + search + "%' OR";
        query += " ucpv.lastName LIKE '%" + search + "%' OR";
        query += " ucpv.post_name LIKE '%" + search + "%'";
    }

    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

//------------- userPost CRUD Operations ----------------------//
// READ ALL userPost
exports.get_all_userPost = function (callback) {
    db_conn.query("SELECT * FROM admin_user_current_post_view", callback);
};

// READ a userPost
exports.get_userPost = function (user_id, callback) {
    db_conn.query("SELECT * FROM admin_user_current_post_view WHERE cuid = ?", [user_id], callback);
};

// CREATE a userPost
exports.add_userPost = function (postID, user_id, assignationDate, callback) {
    var query = "INSERT INTO post_user(postID, cuid, assignationDate) VALUES (?, ?, str_to_date('" + assignationDate  + "','%Y-%m-%d'))";
    var res = db_conn.query(query, [postID, user_id], callback);
    console.log(res.sql);
};

// CREATE a userPost
exports.add_userPostNow = function (postID, user_id, callback) {
    var query = "INSERT INTO post_user(postID, cuid, assignationDate) VALUES (?, ?, NOW())";
    var res = db_conn.query(query, [postID, user_id], callback);
    console.log(res.sql);
};
