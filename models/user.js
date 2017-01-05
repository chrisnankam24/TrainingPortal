/**
 * author: chrisnankam24
 * copyright Orange CM, 2016
 */

// Import Database connection
database = require('../config/database');

// Retreive database connection
db_conn = database.connection;

//------------- 'UserLocation' Table processes ---------------//

// READ ALL user location
exports.get_all_userLocations = function (callback) {
    db_conn.query("SELECT * FROM user_location", callback);
};

// READ a user location
exports.get_userLocation = function (userlocation_id, callback) { // userlocationID to read from DB
    db_conn.query("SELECT * FROM user_location WHERE userlocationID = ?", [userlocation_id], callback);
};

// CREATE a user location
exports.add_userLocation = function (region, town, site, callback) {
    db_conn.query("INSERT INTO user_location(region, town, site) VALUES (?, ?, ?)", [region, town, site],callback);
};

// UPDATE a user location
exports.update_userLocation = function (userlocation_id, region, town, site, callback) {
    db_conn.query("UPDATE user_location SET region = ?, town = ?, site = ? WHERE userLocationID = ?", [region, town, site, userlocation_id], callback);
};

// DELETE a user location
exports.delete_userLocation = function (userlocation_id, callback) {
    db_conn.query("DELETE FROM user_location WHERE userLocationID = ?", [userlocation_id], callback);
};

//------------- 'PostUser' Table processes ---------------//

// READ ALL user post
exports.get_all_UserPosts = function (callback) {
    db_conn.query("SELECT * FROM post_user", callback);
};

// READ a user post
exports.get_UserPost = function (user_id, callback) { // PostUserID to read from DB
    db_conn.query("SELECT * FROM post_user WHERE cuid = ?", [user_id], callback);
};

// CREATE a user post
exports.add_UserPost = function (post_id, user_id, assignation_date, callback) {
    db_conn.query("INSERT INTO post_user(postID, cuid, assignationDate) VALUES (?, ?, ?)",
        [post_id, user_id, assignation_date], callback);
};

// UPDATE a user post
exports.update_UserPost = function (post_id, user_id, assignation_date, callback) {
    db_conn.query("UPDATE post_user SET assignationDate = ? WHERE postID = ? AND cuid = ?",
        [assignation_date, post_id, user_id], callback);
};

// DELETE a user post
exports.delete_UserPost = function (post_id, user_id, callback) {
    db_conn.query("DELETE FROM post_user WHERE postID = ? AND cuid = ?", [post_id, user_id], callback);
};

//------------- 'User' Table processes ---------------//

exports.user_queryBuilder = function (start_ts, offset, search, callback) {
    var total_query = "SELECT COUNT(*) FROM dv_portal_db.user WHERE state = 1";

    if(search != undefined){
        total_query += " AND cuid LIKE '%" + search + "%' OR";
        total_query += " firstName LIKE '%" + search + "%' OR";
        total_query += " lastName LIKE '%" + search + "%'";
    }

    var query = "SELECT u.*, (" + total_query + ") AS total FROM user u WHERE state = 1";

    if(search != undefined){
        query += " AND u.cuid LIKE '%" + search + "%' OR";
        query += " u.firstName LIKE '%" + search + "%' OR";
        query += " u.lastName LIKE '%" + search + "%'";
    }

    query += " ORDER BY firstName LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};


// READ ALL user
exports.get_all_users = function (callback) {
    db_conn.query("SELECT cuid, firstName, lastName FROM user WHERE state = 1", callback);
};

// READ a user
exports.get_user = function (user_id, callback) { // UserID to read from DB
    db_conn.query("SELECT * FROM user_view WHERE cuid = ?", [user_id], callback);
};

// CREATE a user
exports.add_user = function (user, callback) {
    if(user.bossID == ''){
        if(user.employmentDate == ''){

            var res = db_conn.query("INSERT INTO user(cuid, firstName, lastName, email, gender, number," +
                " matricule, userStatus, userLocationID, contractType) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [user.cuid, user.firstName, user.lastName, user.email,
                user.gender, user.number, user.matricule, user.userStatus, user.userLocationID, user.contractType], callback);

        }else{

            var res = db_conn.query("INSERT INTO user(cuid, firstName, lastName, email, gender, employmentDate, number," +
                " matricule, userStatus, userLocationID, contractType) " +
                "VALUES (?, ?, ?, ?, ?, str_to_date('" + user.employmentDate  + "','%Y-%m-%d'), ?, ?, ?, ?, ?);", [user.cuid, user.firstName, user.lastName, user.email,
                user.gender, user.number, user.matricule, user.userStatus, user.userLocationID, user.contractType], callback);


        }


    }else{

        if(user.employmentDate == ''){

            var res = db_conn.query("INSERT INTO user(cuid, firstName, lastName, email, gender, number," +
                " matricule, bossID, userStatus, userLocationID, contractType) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [user.cuid, user.firstName, user.lastName, user.email,
                user.gender, user.number, user.matricule, user.bossID, user.userStatus, user.userLocationID, user.contractType], callback);

        }else{

            var res = db_conn.query("INSERT INTO user(cuid, firstName, lastName, email, gender, employmentDate, number," +
                " matricule, bossID, userStatus, userLocationID, contractType) " +
                "VALUES (?, ?, ?, ?, ?, str_to_date('" + user.employmentDate  + "','%Y-%m-%d'), ?, ?, ?, ?, ?, ?);", [user.cuid, user.firstName, user.lastName, user.email,
                user.gender, user.number, user.matricule, user.bossID, user.userStatus, user.userLocationID, user.contractType], callback);

        }

    }
};

// UPDATE a user
exports.update_user = function (user_id, user, callback) {
    var res = db_conn.query("UPDATE `user` SET firstName = ?, lastName = ?, email = ?, gender = ?, employmentDate = str_to_date('" + user.employmentDate  + "','%Y-%m-%d'), " +
        "number = ?, matricule = ?, bossID = ?, userStatus = ?, userLocationID = ?, " +
        "contractType = ? WHERE cuid = ?", [user.firstName, user.lastName, user.email, user.gender,
        user.number, user.matricule, user.bossID, user.userStatus, user.userLocationID,
        user.contractType, user_id], callback);
};

// DELETE a user
exports.delete_user = function (user_id, callback) {
    //db_conn.query("DELETE FROM user WHERE cuid = ?", [user_id], callback);
    db_conn.query("UPDATE user SET state = 0 WHERE cuid = ?", [user_id], callback);
};

exports.set_user_image = function (user_id, image, callback) {
    db_conn.query("UPDATE user SET usr_img = ? WHERE cuid = ?", [image, user_id], callback);
};

exports.get_user_view_info = function (user_id, callback) {
    db_conn.query("SELECT usr_img, direction FROM admin_user_current_post_view aucpv INNER JOIN post_view pv ON " +
        "(_postID = pv.postID) WHERE aucpv.cuid = ?", [user_id], callback);
};

//-------------------------- User management processes ---------------------------//

exports.get_subordinates = function (user_id, offset, search, callback) {

    var total_query = "SELECT COUNT(*) FROM dv_portal_db.user_management_view WHERE `bossID` = '" + user_id + "'";

    if(search != undefined){
        total_query += " AND (umv.`firstName` LIKE '%" + search + "%' OR umv.`lastName` LIKE '%" + search + "%')";
    }

    var query = "SELECT umv.cuid, umv.usr_img, umv.`firstName`, umv.`lastName`, umv.email, umv.gender, umv.number, umv.`bossID`," +
        " umv.`userLocationID`, umv.`userStatus`, umv.region, umv.town, umv.site," +
        " umv.`contractType`, umv.no_planned_training, umv.name_next_training, umv.date_next_training, umv.average_all_quiz, " +
        "(" + total_query + ") AS total FROM dv_portal_db.user_management_view umv WHERE umv.`bossID` = '" + user_id + "'";

    if(search != undefined){
        query += " AND (umv.`firstName` LIKE '%" + search + "%' OR umv.`lastName` LIKE '%" + search + "%')";
    }

    query +=  " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

exports.get_subs_details = function (user_id, callback) {

    var query = "SELECT * FROM dv_portal_db.user_management_view umv WHERE umv.cuid=?";

    db_conn.query(query, [user_id], callback);
};


exports.get_users_in_services = function (services_id, callback) {

    var query = "SELECT uav.cuid, uav.`firstName`, uav.`lastName`, uav.region, uav.town, uav.site, uav._serviceID " +
        "FROM dv_portal_db.user_admin_view uav WHERE uav._serviceID IN (" + services_id[0];

    for(var i = 1; i < services_id.length; i++){
        query += ", " + services_id[i];
    }

    query += ")";

    db_conn.query(query, callback);

};

exports.get_users_in_planned_training = function (pt_id, callback) {

    var query = "SELECT * FROM dv_portal_db.user_pt_view uav WHERE uav.plannedTrainingID = " + pt_id;

    db_conn.query(query, callback);

};

exports.userDefaultTraining = function (user_id, callback) {

    var query = "SELECT * FROM dv_portal_db.user_default_training_view WHERE cuid = '" + user_id + "' AND  " +
        "user_post_id = (SELECT MAX(user_post_id) FROM post_user WHERE cuid = '" + user_id + "')";

    db_conn.query(query, callback);

};

exports.userPostTimeline = function (user_id, callback) {

    var query = "SELECT pu.user_post_id, pu.`postID`, pu.cuid, pu.`assignationDate`, p.post_name FROM " +
        "dv_portal_db.post_user pu INNER JOIN dv_portal_db.post p ON ( pu.`postID` = p.`postID`  ) WHERE pu.cuid = '" + user_id  + "'";

    console.log(query);

    db_conn.query(query, callback);

};