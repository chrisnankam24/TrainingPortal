/**
 * Created by user on 11/7/2016.
 */
// Import Database connection
database = require('../config/database');

// Retreive database connection
db_conn = database.connection;

//------------- Training CRUD Operations ----------------------//
// READ ALL Training
exports.get_all_training = function (callback) {
    db_conn.query("SELECT * FROM training", callback);
};

// READ a Training
exports.get_training = function (training_id, callback) {
    db_conn.query("SELECT * FROM training WHERE trainingID = ?", [training_id], callback);
};

// CREATE a training
exports.add_training = function (training_name, callback) {
    db_conn.query("INSERT INTO training(training_name) VALUES (?);", [training_name],callback);
};

// UPDATE a training
exports.update_training = function (training_id, training_name, callback) {
    db_conn.query("UPDATE training SET training_name = ? WHERE trainingID = ?", [training_name, training_id], callback);
};

// DELETE a training
exports.delete_training = function (training_id, callback) {
    var query = "DELETE FROM training WHERE trainingID = " + training_id;
    db_conn.query(query, callback);
};


//------------- User Planned Training processes ---------------//

function buildTrainingQuery(query, group, show_hidden, filter_type, start_ts, end_ts, search) {
    var connector = " AND ";

    if(group != 'all'){
        if(group == 'taken'){
            query += connector + "utv.trainingTaken = 1 ";
        }else{
            query += connector + "utv.trainingTaken = 0 ";
        }
    }
    if(show_hidden == false){
        query += connector + "utv.hidden = 0";
    }

    if(filter_type != 'none'){
        query += connector + "utv.trainingType LIKE '%" + filter_type + "%'";
    }


    if(start_ts != 'none'){
        query += connector + "utv.startTS >= str_to_date('" + start_ts + "','%Y-%m-%d')";
    }

    if(search != undefined){
        query += connector + "utv.training_name LIKE '%" + search + "%'";
    }

    return query;
}

// READ ALL user training
exports.user_training_queryBuilder = function (user_id, group, show_hidden, filter_type, start_ts, end_ts, offset, search, callback) {
    var total_query = "SELECT COUNT(*) FROM dv_portal_db.user_training_view utv WHERE utv.cuid = '" + user_id + "'";

    total_query = buildTrainingQuery(total_query, group, show_hidden, filter_type, start_ts, end_ts, search);

    var query = "SELECT utv.cuid, utv.sessionID, utv.`trainingTaken`, utv.hidden, utv.`dateTaken`, utv.`startTS`, utv.`endTS`, " +
        "utv.region, utv.town, utv.site, utv.`sessionDuration`, utv.total_takers, utv.`conferenceNumber`, utv.`trainingCode`, " +
        "utv.`trainingType`, utv.`transmissionMode`, utv.training_name, utv.trainingID, (" + total_query + ") AS total " +
        "FROM dv_portal_db.user_training_view utv WHERE " +
        "utv.cuid = '" + user_id + "'";

    query = buildTrainingQuery(query,group, show_hidden, filter_type, start_ts, end_ts, search);

    query += " LIMIT 10 OFFSET " + offset;

    console.log(query);

    db_conn.query(query, callback);
};

exports.session_training_queryBuilder = function (user_id, offset, sessions, callback) {
    var total_query = "SELECT COUNT(*) FROM dv_portal_db.user_training_view utv WHERE cuid = '" + user_id + "' AND sessionID IN (" + sessions[0] ;
    for(var i = 1; i < sessions.length; i++){
        total_query += ', ' + sessions[i];
    }
    total_query += ')';

    var query = "SELECT utv.cuid, utv.sessionID, utv.`trainingTaken`, utv.hidden, utv.`dateTaken`, utv.`startTS`, utv.`endTS`, " +
        "utv.region, utv.town, utv.site, utv.`sessionDuration`, utv.total_takers, utv.`conferenceNumber`, utv.`trainingCode`, " +
        "utv.`trainingType`, utv.`transmissionMode`, utv.training_name, utv.trainingID, (" + total_query + ") AS total " +
        "FROM dv_portal_db.user_training_view utv WHERE " +
        "utv.cuid = '" + user_id + "' AND sessionID IN (" + sessions[0];
    for(var i = 1; i < sessions.length; i++){
        query += ', ' + sessions[i];
    }
    query += ')';

    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

exports.user_subs_training_queryBuilder = function (user_id, start_ts, end_ts, offset, callback) {
    var total_query = "SELECT COUNT(*) FROM dv_portal_db.user_training_view utv WHERE cuid = '" + user_id + "' AND " +
        "startTS >=str_to_date('" + start_ts  + "','%Y-%m-%d') AND endTS <= str_to_date('" + end_ts  + "','%Y-%m-%d')" ;

    var query = "SELECT utv.cuid, utv.sessionID, utv.`trainingTaken`, utv.`dateTaken`, utv.`startTS`, utv.`endTS`, "+
        "utv.training_name, (" + total_query + ") AS total " +
        "FROM dv_portal_db.user_training_view utv WHERE " +
        "utv.cuid = '" + user_id + "' AND startTS >=str_to_date('" + start_ts  + "','%Y-%m-%d') " +
        "AND endTS <= str_to_date('" + end_ts  + "','%Y-%m-%d')" ;

    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

exports.user_subs_quiz_queryBuilder = function (user_id, start_ts, end_ts, offset, callback) {
    var total_query = "SELECT COUNT(*) FROM dv_portal_db.subs_quiz_view uqv WHERE uqv.cuid = '" + user_id + "' AND " +
        "uqv.dateTakingQuiz BETWEEN str_to_date('" + start_ts  + "','%Y-%m-%d') AND str_to_date('" + end_ts  + "','%Y-%m-%d')" ;

    var query = "SELECT uqv.dateTakingQuiz, uqv.score, uqv.quiz_name, uqv.creationDate, (" + total_query + ") AS total " +
        "FROM dv_portal_db.subs_quiz_view uqv WHERE uqv.cuid = '" + user_id + "' AND " +
        "uqv.dateTakingQuiz BETWEEN str_to_date('" + start_ts  + "','%Y-%m-%d') AND str_to_date('" + end_ts  + "','%Y-%m-%d')" ;

    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);

};


exports.all_training_queryBuilder = function (start_ts, offset, search, callback) {
    var total_query = "SELECT COUNT(*) FROM dv_portal_db.training";

    if(search != undefined){
        total_query += " WHERE training_name LIKE '%" + search + "%'";
    }

    var query = "SELECT t.trainingID, t.training_name, (" + total_query + ") AS total FROM training t ";

    if(search != undefined){
        query += " WHERE t.training_name LIKE '%" + search + "%'";
    }

    query += " ORDER BY training_name ASC LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

exports.all_ptTraining_queryBuilder = function (start_ts, offset, search, callback) {
    var total_query = "SELECT COUNT(*) FROM planned_training pt INNER JOIN training t ON ( pt.`trainingID` = t.`trainingID`)";

    if(search != undefined){
        total_query += " WHERE training_name LIKE '%" + search + "%'";
    }

    var query = "SELECT pt.*, t.training_name, (" + total_query + ") AS total FROM planned_training pt INNER " +
        "JOIN training t ON ( pt.`trainingID` = t.`trainingID`) ";

    if(search != undefined){
        query += " WHERE t.training_name LIKE '%" + search + "%'";
    }

    query += " ORDER BY startDate DESC LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

exports.insert_training_resources = function (training_id, resources_id, callback) {
    var query = "INSERT INTO resource_training(trainingID, resourceID) VALUES (" + training_id + ", " + resources_id[0] + ")";

    for(var i = 1; i < resources_id.length; i++){
        query += ",(" + training_id + ", " + resources_id[i] + ")";
    }

    db_conn.query(query, callback);

};

// Read day by day planned session info for the year
exports.yearly_triaining_info = function(user_id, year, callback){

    var query = "SELECT utv.cuid, utv.`sessionID`, utv.training_name, startTS AS startDay, " +
        "endTS AS endDay FROM dv_portal_db.user_training_view utv WHERE utv.cuid = '" + user_id + "' " +
        "AND YEAR(utv.`startTS`) >= " + year + " AND YEAR(utv.`endTS`) <= " + year;

    db_conn.query(query, callback);
};

// Read training info based on sessionID
exports.session_training_info = function (user_id, session_id, callback) {

    var query = "SELECT utv.cuid, utv.`sessionID`, utv.`trainingTaken`, utv.hidden, utv.`dateTaken`, utv.`startTS`, " +
        "utv.`endTS`, utv.region, utv.town, utv.site, utv.`sessionDuration`, utv.total_takers, utv.`conferenceNumber`, " +
        "utv.`trainingType`, utv.`transmissionMode`, utv.training_name, utv.`trainingID` " +
        "FROM dv_portal_db.user_training_view utv WHERE utv.cuid = '" + user_id + "' " +
        "AND utv.sessionID = " + session_id;

    db_conn.query(query, callback);
};

// Read training external trainer info based on sessionID
exports.training_ex_trainers = function (session_id, callback) {

    var query = "SELECT * FROM dv_portal_db.ext_trainers_view etv  WHERE etv.sessionID = " + session_id;

    db_conn.query(query, callback);
};

// Read training internal trainer info based on sessionID
exports.training_int_trainers = function (session_id, callback) {

    var query = "SELECT * FROM dv_portal_db.int_trainers_view etv  WHERE etv.sessionID = " + session_id;

    db_conn.query(query, callback);
};

exports.ex_trainers = function (callback) {

    var query = "SELECT * FROM dv_portal_db.external_trainer";

    db_conn.query(query, callback);
};

exports.int_trainers = function (callback) {

    var query = "SELECT cuid, firstName, lastName FROM dv_portal_db.user u WHERE u.userStatus = 'Trainer'";

    db_conn.query(query, callback);
};

// Read training resources info based on sessionID
exports.training_resources = function (session_id, callback) {

    var query = "SELECT * FROM dv_portal_db.training_resources_view trv  WHERE trv.sessionID = " + session_id;

    db_conn.query(query, callback);
};

// Read training quiz info based on sessionID
exports.training_quiz = function (session_id, callback) {

    var query = "SELECT * FROM dv_portal_db.training_quiz_view tqv WHERE tqv.sessionID = " + session_id;

    db_conn.query(query, callback);
};

// Get Training Code
exports.training_code = function (user_id, session_id, callback) {

    var query = "SELECT utv.`trainingCode` FROM dv_portal_db.user_training_view utv WHERE utv.cuid = '" + user_id +
        "' AND utv.sessionID = " + session_id;

    db_conn.query(query, callback);
};

// Set Training Taken
exports.set_training_taken = function (user_id, session_id, callback) {

    var query = "UPDATE user_training_session SET trainingTaken = ?, dateTaken = NOW() WHERE cuid = ? AND sessionID = ?";

    db_conn.query(query, [1, user_id, session_id], callback);
};

// Get Training Evaluation Form
exports.training_evaluation_form = function (session_id, callback) {

    var query = "SELECT * FROM dv_portal_db.training_evaluation_view tev WHERE tev.`sessionID` = ?";

    db_conn.query(query, [session_id], callback);
};

// Get Verify if has evaluated training session
exports.has_evaluated = function (user_id, session_id, callback) {

    var query = "SELECT * FROM dv_portal_db.user_training_evaluation ute WHERE ute.sessionID = ? AND ute.cuid = ?";

    db_conn.query(query, [session_id, user_id], callback);
};

// Insert User Form Evaluation Comment
exports.insert_user_training_comment = function (user_id, session_id, evaluationFormID, trainingComment, callback) {

    var query = "INSERT INTO user_training_evaluation(cuid, evaluationFormID, trainingComment, sessionID) VALUES (?, ?, ?, ?)";

    db_conn.query(query, [user_id, evaluationFormID, trainingComment, session_id], callback);
};

// Insert User Form Evaluation Criteria
exports.insert_user_training_criteria = function (user_id, session_id, user_response, callback) {

    var query = "INSERT INTO user_evaluation_criteria(cuid, evaluationCriteriaID, criteriaPropositionID, " +
        "sessionID) VALUES ('" + user_id + "', " + user_response[0].criteriaID + ", " + user_response[0].propositionID + ", " + session_id + ")";

    for(var i = 1; i < user_response.length; i++){
        query += ",('" + user_id + "', " + user_response[i].criteriaID + ", " + user_response[i].propositionID + ", " + session_id + ")";
    }

    db_conn.query(query, callback);
};

// Insert Planned Training
exports.insert_planned_training = function (training_type, trans_mode, start_date, end_date, session_duration, conference_num, training_id, training_code, evaluation_id, training_audience, callback) {

    var query = "INSERT INTO planned_training(trainingType, transmissionMode, startDate, endDate, sessionDuration, " +
        "conferenceNumber, trainingID, trainingCode, evaluationFormID, trainingAudience) " +
        "VALUES ('" + training_type + "', '" + trans_mode + "', '" + start_date + "', '" + end_date + "', " + session_duration + ", '" +
        "" + conference_num + "', " + training_id + ", '" + training_code + "', " + evaluation_id + ",  '" + training_audience + "')";

    db_conn.query(query, callback);

};

exports.insert_training_session = function (start_date, end_date, trainingLocationID, callback) {

    var query = "INSERT INTO training_session(startTS, endTS, trainingLocationID) VALUES ('" + start_date + "', '" + end_date + "', " + trainingLocationID + ")";

    if(trainingLocationID == -1) {

        query = "INSERT INTO training_session(startTS, endTS, trainingLocationID) VALUES ('" + start_date + "', '" + end_date + "', NULL)";

    }

    console.log(query);

    db_conn.query(query, callback);

};

exports.insert_ts_pt = function (ts_id, pt_id, callback) {

    var query = "INSERT INTO trainingsession_plannedtraining(sessionID, plannedTrainingID) VALUES (" + ts_id + ", " + pt_id + ")";

    db_conn.query(query, callback);

};

exports.insert_user_training_session = function (parts, ss_id, callback) {

    var query = "INSERT INTO user_training_session(cuid, sessionID, userCurrentPostID, trainingTaken, hidden) " +
        "VALUES ('" + parts[0].cuid + "', '" + ss_id + "', (select `postID` from `post_user` " +
        "where (`cuid` = '" + parts[0].cuid + "') order by `assignationDate` desc limit 1), 0, 0)";

    for(var i = 1; i < parts.length; i++){
        query += ",('" + parts[i].cuid + "', '" + ss_id + "', (select `postID` from `post_user`" +
            "where (`cuid` = '" + parts[i].cuid + "') order by `assignationDate` desc limit 1), 0, 0)";
    }

    db_conn.query(query, callback);

};

exports.insert_session_trainers = function (ss_id, trainers, callback) {

    console.log(trainers);

    var query = "";

    if(trainers[0].cuid == 'NULL'){
        query = "INSERT INTO trainer_trainingsession(exTrainerID, sessionID, trainerType, cuid) VALUES (" + trainers[0].extrainerID + "," +
            " " + ss_id + ", " + trainers[0].trainerType + ", "+ trainers[0].cuid +")";
    }else{
        query = "INSERT INTO trainer_trainingsession(exTrainerID, sessionID, trainerType, cuid) VALUES (" + trainers[0].extrainerID + "," +
            " " + ss_id + ", " + trainers[0].trainerType + ", '"+ trainers[0].cuid +"')";
    }

    for(var i = 1; i < trainers.length; i++){
        if(trainers[i].cuid == 'NULL'){
            query += ",(" + trainers[i].extrainerID + ", " + ss_id + ", " + trainers[i].trainerType + ", " + trainers[i].cuid + ")";
        }else{
            query += ",(" + trainers[i].extrainerID + ", " + ss_id + ", " + trainers[i].trainerType + ", '" + trainers[i].cuid + "')";
        }
    }

    console.log(query);

    db_conn.query(query, callback);

};

// READ ALL Planned_training
exports.get_all_planned_training = function (callback) {
    db_conn.query("SELECT pt.*, t.training_name FROM dv_portal_db.planned_training pt " +
        "INNER JOIN dv_portal_db.training t ON ( pt.`trainingID` = t.`trainingID`  )  ", callback);
};

// READ a Planned_training
exports.get_planned_training = function (planned_training_id, callback) {
    db_conn.query("SELECT * FROM planned_training WHERE plannedTrainingID = ?", [planned_training_id], callback);
};

// DELETE a planned_training
exports.delete_planned_training = function (planned_training_id, callback) {
    var query = "DELETE FROM planned_training WHERE plannedTrainingID = " + planned_training_id;
    db_conn.query(query, callback);
};

exports.hideTraining = function (user_id, training_ids, callback) {
    var query = "UPDATE user_training_session SET hidden = 1 WHERE cuid = '" + user_id + "' AND sessionID IN (" + training_ids[0];

    for(var i = 1; i < training_ids.length; i++){
        query += ', ' + training_ids[i];
    }
    query += ')';

    db_conn.query(query, callback);
};

exports.get_pt_sessions = function (pt_id, callback) {

    var query = "SELECT * FROM admin_pt_sessions_view WHERE plannedTrainingID = " + pt_id;

     db_conn.query(query, callback);
};

exports.get_session_participants = function (session_id, callback) {

    var query = "SELECT * FROM admin_session_participants_view WHERE sessionID = " + session_id;

     db_conn.query(query, callback);
};

exports.session_taking = function (user_id, session_id, taken, callback) {

    db_conn.query("UPDATE user_training_session SET trainingTaken = ?, dateTaken = NOW() " +
        "WHERE cuid = ? AND sessionID = ?", [taken, user_id, session_id], callback);
};

exports.users_training_table = function (date, services, callback) {

    var query = "SELECT uts.cuid, u.firstName, u.lastName," +
        "(SELECT _postID FROM user_admin_view WHERE cuid = uts.cuid) AS post_id, " +
        "(SELECT post_name FROM post_view WHERE postID = post_id) AS post_name, " +
        "(SELECT _serviceID FROM user_admin_view WHERE cuid = uts.cuid) AS service_id, " +
        "(SELECT COUNT(*) FROM user_training_session uts2 WHERE trainingTaken = '1' AND uts2.cuid = uts.cuid AND YEAR(dateTaken) = " + date + " AND MONTH(dateTaken) = 1) AS January, " +
        "(SELECT COUNT(*) FROM user_training_session uts2 WHERE trainingTaken = '1' AND uts2.cuid = uts.cuid AND YEAR(dateTaken) = " + date + " AND MONTH(dateTaken) = 2) AS Febuary," +
        "(SELECT COUNT(*) FROM user_training_session uts2 WHERE trainingTaken = '1' AND uts2.cuid = uts.cuid AND YEAR(dateTaken) = " + date + " AND MONTH(dateTaken) = 3) AS March," +
        "(SELECT COUNT(*) FROM user_training_session uts2 WHERE trainingTaken = '1' AND uts2.cuid = uts.cuid AND YEAR(dateTaken) = " + date + " AND MONTH(dateTaken) = 4) AS April," +
        "(SELECT COUNT(*) FROM user_training_session uts2 WHERE trainingTaken = '1' AND uts2.cuid = uts.cuid AND YEAR(dateTaken) = " + date + " AND MONTH(dateTaken) = 5) AS May," +
        "(SELECT COUNT(*) FROM user_training_session uts2 WHERE trainingTaken = '1' AND uts2.cuid = uts.cuid AND YEAR(dateTaken) = " + date + " AND MONTH(dateTaken) = 6) AS June," +
        "(SELECT COUNT(*) FROM user_training_session uts2 WHERE trainingTaken = '1' AND uts2.cuid = uts.cuid AND YEAR(dateTaken) = " + date + " AND MONTH(dateTaken) = 7) AS July," +
        "(SELECT COUNT(*) FROM user_training_session uts2 WHERE trainingTaken = '1' AND uts2.cuid = uts.cuid AND YEAR(dateTaken) = " + date + " AND MONTH(dateTaken) = 8) AS August," +
        "(SELECT COUNT(*) FROM user_training_session uts2 WHERE trainingTaken = '1' AND uts2.cuid = uts.cuid AND YEAR(dateTaken) = " + date + " AND MONTH(dateTaken) = 9) AS September," +
        "(SELECT COUNT(*) FROM user_training_session uts2 WHERE trainingTaken = '1' AND uts2.cuid = uts.cuid AND YEAR(dateTaken) = " + date + " AND MONTH(dateTaken) = 10) AS October," +
        "(SELECT COUNT(*) FROM user_training_session uts2 WHERE trainingTaken = '1' AND uts2.cuid = uts.cuid AND YEAR(dateTaken) = " + date + " AND MONTH(dateTaken) = 11) AS November," +
        "(SELECT COUNT(*) FROM user_training_session uts2 WHERE trainingTaken = '1' AND uts2.cuid = uts.cuid AND YEAR(dateTaken) = " + date + " AND MONTH(dateTaken) = 12) AS December" +
        " FROM dv_portal_db.user_training_session uts" +
        " INNER JOIN dv_portal_db.training_session ts ON ( uts.`sessionID` = ts.`sessionID`  )" +
        " INNER JOIN dv_portal_db.trainingsession_plannedtraining tp ON ( ts.`sessionID` = tp.`sessionID`  )" +
        " INNER JOIN dv_portal_db.planned_training pt ON ( tp.`plannedTrainingID` = pt.`plannedTrainingID` )" +
        " INNER JOIN dv_portal_db.training t ON ( pt.`trainingID` = t.`trainingID` )" +
        " INNER JOIN dv_portal_db.`user` u ON ( uts.cuid = u.cuid )" +
        " WHERE uts.trainingTaken = '1'";

    if(services != 'all'){
        query += " AND (SELECT _serviceID FROM user_admin_view WHERE cuid = uts.cuid) IN (" +  services.join(',') + ")";
    }

    query +=  " GROUP BY uts.cuid";

    console.log(query);

    db_conn.query(query, callback);

};

exports.training_table = function (callback) {
    var query = "SELECT tp.plannedTrainingID, " +
        "(SELECT training_name FROM admin_pt_users_view WHERE plannedTrainingID = tp.plannedTrainingID LIMIT 1) AS training_name, " +
        "(SELECT startDate FROM admin_pt_users_view WHERE plannedTrainingID = tp.plannedTrainingID LIMIT 1) AS startDate, " +
        "(SELECT endDate FROM admin_pt_users_view WHERE plannedTrainingID = tp.plannedTrainingID LIMIT 1) AS endDate, " +
        "(SELECT sessionDuration FROM admin_pt_users_view WHERE plannedTrainingID = tp.plannedTrainingID LIMIT 1) AS sessionDuration, " +
        "(SELECT GROUP_CONCAT(DISTINCT town SEPARATOR ',') FROM admin_pt_users_view WHERE plannedTrainingID = tp.plannedTrainingID) AS town, " +
        "(SELECT GROUP_CONCAT(DISTINCT site SEPARATOR ',') FROM admin_pt_users_view WHERE plannedTrainingID = tp.plannedTrainingID) AS site, " +
        "(SELECT COUNT(*) FROM admin_pt_users_view WHERE plannedTrainingID = tp.plannedTrainingID) AS total_expected, " +
        "(SELECT COUNT(*) FROM admin_pt_users_view WHERE plannedTrainingID = tp.plannedTrainingID AND gender = '1') AS men_expected, " +
        "(SELECT COUNT(*) FROM admin_pt_users_view WHERE plannedTrainingID = tp.plannedTrainingID AND gender = '0') AS women_expected, " +
        "(SELECT COUNT(*) FROM admin_pt_users_view WHERE plannedTrainingID = tp.plannedTrainingID AND trainingTaken = '1') AS total_attended, " +
        "(SELECT COUNT(*) FROM admin_pt_users_view WHERE plannedTrainingID = tp.plannedTrainingID AND gender = '1' AND trainingTaken = '1') AS men_attended, " +
        "(SELECT COUNT(*) FROM admin_pt_users_view WHERE plannedTrainingID = tp.plannedTrainingID AND gender = '0' AND trainingTaken = '1') AS women_attended, " +
        "(SELECT GROUP_CONCAT(DISTINCT service SEPARATOR ',') FROM admin_pt_users_view WHERE plannedTrainingID = tp.plannedTrainingID) as services " +
        "FROM dv_portal_db.trainingsession_plannedtraining tp GROUP BY plannedTrainingID";

    db_conn.query(query, callback);

};

exports.get_all_eval_reports = function (callback) {
    db_conn.query("SELECT * FROM evaluation_form", callback);
};

exports.pt_users = function (pt_id, callback) {
    var res = db_conn.query("SELECT * FROM user_pt_view WHERE plannedTrainingID = " + pt_id, callback);
    console.log(res.sql);
};
