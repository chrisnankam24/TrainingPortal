/**
 * Created by user on 12/1/2016.
 */
// Import Database connection
database = require('../config/database');

// Retreive database connection
db_conn = database.connection;

exports.exTrainer_queryBuilder = function (start_ts, offset, search, callback) {

    var total_query = "SELECT COUNT(*) FROM dv_portal_db.external_trainer";

    if(search != undefined){
        total_query += " WHERE firstName LIKE '%" + search + "%' OR";
        total_query += " lastName LIKE '%" + search + "%'";
    }

    var query = "SELECT t.trainerID, t.firstName, t.lastName, t.gender, (" + total_query + ") AS total FROM external_trainer t ";

    if(search != undefined){
        query += " WHERE t.firstName LIKE '%" + search + "%' OR";
        query += " t.lastName LIKE '%" + search + "%'";
    }

    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

//------------- exTrainer CRUD Operations ----------------------//
// READ ALL exTrainer
exports.get_all_exTrainer = function (callback) {
    db_conn.query("SELECT * FROM external_trainer", callback);
};

// READ a exTrainer
exports.get_exTrainer = function (exTrainer_id, callback) {
    db_conn.query("SELECT * FROM external_trainer WHERE trainerID = ?", [exTrainer_id], callback);
};

// CREATE a exTrainer
exports.add_exTrainer = function (first_name, last_name, gender, callback) {
    var query = "INSERT INTO External_Trainer(firstName, lastName, gender) VALUES (?, ?, ?);";
    db_conn.query(query, [first_name, last_name, gender], callback);
};

// UPDATE a exTrainer
exports.update_exTrainer = function (id, first_name, last_name, gender, callback) {
    var query = "UPDATE external_trainer SET firstName = ?, lastName = ?, gender = ? WHERE trainerID = ?;";
    db_conn.query(query, [first_name, last_name, gender, id], callback);
};

// DELETE a exTrainer
exports.delete_exTrainer = function (exTrainer_id, callback) {
    var query = "DELETE FROM external_trainer WHERE trainerID = " + exTrainer_id;
    db_conn.query(query, callback);
};
