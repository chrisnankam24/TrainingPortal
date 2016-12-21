/**
 * author: chrisnankam24
 * copyright Orange CM, 2016
 */

// Import Database connection
database = require('../config/database');

// Retreive database connection
db_conn = database.connection;

// READ ALL posts
exports.posts_queryBuilder = function (start_ts, offset, search, callback) {
    var total_query = "SELECT COUNT(*) FROM dv_portal_db.post";

    if(search != undefined){
        total_query += " WHERE post_name LIKE '%" + search + "%'";
    }

    var query = "SELECT p.postID, p.post_name, p.level, s.service, (" + total_query + ") AS total FROM post p " +
        "INNER JOIN service s ON(s.serviceID = p.serviceID)";

    if(search != undefined){
        query += " WHERE p.post_name LIKE '%" + search + "%'";
    }

    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

//------------- 'Direction' Table processes ---------------//

exports.directions_queryBuilder = function (start_ts, offset, search, callback) {
    var total_query = "SELECT COUNT(*) FROM dv_portal_db.direction";

    if(search != undefined){
        total_query += " WHERE direction LIKE '%" + search + "%'";
    }

    var query = "SELECT d.directionID, d.direction, (" + total_query + ") AS total FROM direction d ";

    if(search != undefined){
        query += " WHERE d.direction LIKE '%" + search + "%'";
    }

    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

// READ ALL direction
exports.get_all_directions = function (callback) {
    db_conn.query("SELECT * FROM direction", callback);
};

// READ a direction
exports.get_direction = function (direction_id, callback) { // DirectionID to read from DB
    db_conn.query("SELECT * FROM direction WHERE directionID = ?", [direction_id], callback);
};

// CREATE a direction
exports.add_direction = function (direction_name, callback) {
    var query = "INSERT INTO direction(direction) VALUES ('" + direction_name + "')";

    db_conn.query(query,callback);
};

// UPDATE a direction
exports.update_direction = function (direction_id, direction_name, callback) {
    var query = "UPDATE direction SET direction = '" + direction_name + "' WHERE directionID = " + direction_id;

    db_conn.query(query, callback);
};

// DELETE a direction
exports.delete_direction = function (direction_id, callback) {
    var query = "DELETE FROM direction WHERE directionID = " + direction_id;

    db_conn.query(query, callback);
};

//------------- 'Department' Table processes ---------------//


exports.departments_queryBuilder = function (start_ts, offset, search, callback) {
    var total_query = "SELECT COUNT(*) FROM dv_portal_db.department";

    if(search != undefined){
        total_query += " WHERE department LIKE '%" + search + "%'";
    }

    var query = "SELECT d.departmentID, d.department, d.directionID, di.direction, (" + total_query + ") AS total FROM department d " +
        "INNER JOIN direction di ON(d.directionID = di.directionID)";

    if(search != undefined){
        query += " WHERE d.department LIKE '%" + search + "%'";
    }


    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

// READ ALL department
exports.get_all_departments = function (callback) {
    db_conn.query("SELECT * FROM department", callback);
};

// READ a department
exports.get_department = function (department_id, callback) { // departmentID to read from DB
    db_conn.query("SELECT * FROM department WHERE departmentID = ?", [department_id], callback);
};

// CREATE a department
exports.add_department = function (department_name, direction_id, callback) {
    var query = "INSERT INTO department(department, directionID) VALUES ('" + department_name + "', " + direction_id + ")";
    db_conn.query(query,callback);
};

// UPDATE a department
exports.update_department = function (department_id, direction_id, department_name, callback) {
    var query = "UPDATE department SET department = '"+ department_name + "', directionID = " + direction_id + " WHERE departmentID = " + department_id;
    db_conn.query(query, callback);
};

// DELETE a department
exports.delete_department = function (department_id, callback) {
    var query = "DELETE FROM department WHERE departmentID = " + department_id;
    db_conn.query(query, callback);
};

//------------- 'Service' Table processes ---------------//

exports.services_queryBuilder = function (start_ts, offset, search, callback) {
    var total_query = "SELECT COUNT(*) FROM dv_portal_db.service";

    if(search != undefined){
        total_query += " WHERE service LIKE '%" + search + "%'";
    }

    var query = "SELECT s.serviceID, s.service, d.department, s.departmentID, (" + total_query + ") AS total FROM service s " +
        "INNER JOIN department d ON(s.departmentID = d.departmentID)";

    if(search != undefined){
        query += " WHERE s.service LIKE '%" + search + "%'";
    }

    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

// READ ALL service
exports.get_all_services = function (callback) {
    db_conn.query("SELECT * FROM service", callback);
};

// READ a service
exports.get_service = function (service_id, callback) { // serviceID to read from DB
    db_conn.query("SELECT * FROM service WHERE serviceID = ?", [service_id], callback);
};

// CREATE a service
exports.add_service = function (service_name, department_id, callback) {
    db_conn.query("INSERT INTO service(service, departmentID) VALUES (?, ?)", [service_name, department_id],callback);
};

// UPDATE a service
exports.update_service = function (service_id, department_id, service_name, callback) {
    var query = "UPDATE service SET service = '" + service_name + "', departmentID = " + department_id + " WHERE serviceID = " + service_id;

    db_conn.query(query, callback);
};

// DELETE a service
exports.delete_service = function (service_id, callback) {
    var query = "DELETE FROM service WHERE serviceID = " + service_id;

    db_conn.query(query, callback);
};

//------------- 'post' Table processes ---------------//

// READ ALL post
exports.get_all_posts = function (callback) {
    db_conn.query("SELECT * FROM post", callback);
};

// READ a post
exports.get_post = function (post_id, callback) { // postID to read from DB
    db_conn.query("SELECT * FROM post WHERE postID = ?", [post_id], callback);
};

// CREATE a post
exports.add_post = function (post_name, level, service_id, callback) {
    var query = "INSERT INTO post(post_name, level, serviceID) VALUES ('" + post_name + "', " + level + ", " + service_id + ")";

    db_conn.query(query,callback);
};

// UPDATE a post
exports.update_post = function (post_id, post_name, level, service_id, callback) {
    var query = "UPDATE post SET post_name = '" + post_name + "', level = " + level + ", serviceID = " + service_id + " WHERE postID = " + post_id;
    db_conn.query(query, callback);
};

exports.insert_post_trainings = function (post_id, trainings, callback) {
    var query = "INSERT INTO initial_training(postID, trainingID) VALUES (" + post_id + ", " + trainings[0] + ")";

    for(var i = 1; i < trainings.length; i++){
        query += ",(" + post_id + ", " + trainings[i] + ")";
    }

    db_conn.query(query, callback);

};

// DELETE a post
exports.delete_post = function (post_id, callback) {
    var query = "DELETE FROM post WHERE postID = " + post_id;
    db_conn.query(query, callback);
};
