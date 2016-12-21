/**
 * Created by user on 11/11/2016.
 */
// Import Database connection
database = require('../config/database');

// Retreive database connection
db_conn = database.connection;

//------------- User Quiz processes ---------------//

function buildQuizQuery(query, group, show_hidden, quiz_category, quiz_sub_category, start_ts, search) {
    var connector = " AND ";

    if(group != 'all'){
        if(group == 'taken'){
            query += connector + "uqv.quizTaken = 1 ";
        }else{
            query += connector + "uqv.quizTaken = 0 ";
        }
    }
    if(show_hidden == false){
        query += connector + "uqv.quiz_hidden = 1";
    }else{
        query += connector + "uqv.quiz_hidden = 0";
    }

    if(quiz_category != 'none'){
        query += connector + "uqv.category LIKE '%" + quiz_category + "%'";
    }

    if(quiz_sub_category != 'none'){
        query += connector + "uqv.subCategory LIKE '%" + quiz_sub_category + "%'";
    }

    if(start_ts != 'none'){
        query += connector + "uqv.creationDate >= str_to_date('" + start_ts + "','%Y-%m-%d')";
    }

    if(search != undefined){
        query += connector + "uqv.quiz_name LIKE '%" + search + "%'";
    }

    return query;
}

// READ ALL user quiz
exports.user_quiz_queryBuilder = function (user_id, group, show_hidden, quiz_category, quiz_sub_category, start_ts, offset, search, callback) {
    var total_query = "SELECT COUNT(*) FROM dv_portal_db.user_quiz_view uqv WHERE uqv.cuid = '" + user_id + "'";

    total_query = buildQuizQuery(total_query, group, show_hidden, quiz_category, quiz_sub_category, start_ts, search);

    var query = "SELECT uqv.`user_quiz_ID`, uqv.cuid, uqv.`quizID`, uqv.`dateTakingQuiz`, uqv.quiz_hidden, uqv.`plannedTrainingID`, " +
        "uqv.score, uqv.`quizTaken`, uqv.quiz_name, uqv.`creationDate`, uqv.`subCategoryID`, uqv.`subCategory`, " +
        "uqv.`categoryID`, uqv.category, uqv.`quizType`, uqv.training_name, uqv.num_questions, (" + total_query + ") AS total " +
        "FROM dv_portal_db.user_quiz_view uqv WHERE uqv.cuid = '" + user_id + "'";


    query = buildQuizQuery(query,group, show_hidden, quiz_category, quiz_sub_category, start_ts, search);

    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};


exports.quiz_queryBuilder = function (start_ts, offset, search, callback) {

    var total_query = "SELECT COUNT(*) FROM dv_portal_db.admin_quiz_view";

    if(search != undefined){
        total_query += " WHERE quiz_name LIKE '%" + search + "%' OR";
        total_query += " creator LIKE '%" + search + "%' OR";
        total_query += " subCategory LIKE '%" + search + "%'";
    }

    var query = "SELECT u.*, (" + total_query + ") AS total FROM admin_quiz_view u";

    if(search != undefined){
        query += " WHERE u.quiz_name LIKE '%" + search + "%' OR";
        query += " u.creator LIKE '%" + search + "%' OR";
        query += " u.subCategory LIKE '%" + search + "%'";
    }

    query += " LIMIT 10 OFFSET " + offset;

    db_conn.query(query, callback);
};

// READ ALL quiz
exports.get_all_quiz = function (callback) {
    db_conn.query("SELECT * FROM quiz", callback);
};

// READ a quiz
exports.get_quiz = function (quiz_id, callback) { // QuizID to read from DB
    db_conn.query("SELECT * FROM quiz WHERE quizID = ?", [quiz_id], callback);
};

// CREATE a quiz
exports.add_quiz = function (quiz_name, plannedTrainingID, subCategoryID, quizType, creator, callback) {
    var query = "INSERT INTO quiz(quiz_name, creationDate, plannedTrainingID, subCategoryID, quizType, creator) VALUES (?, NOW(), ?, ?, ?, ?)";

    if(quizType == 'Open') {
        query = "INSERT INTO quiz(quiz_name, creationDate, plannedTrainingID, subCategoryID, quizType, creator) VALUES (?, NOW(), NULL, ?, ?, ?)";
        db_conn.query(query,[quiz_name, subCategoryID, quizType, creator],callback);
    }else{
        query = "INSERT INTO quiz(quiz_name, creationDate, plannedTrainingID, subCategoryID, quizType, creator) VALUES (?, NOW(), ?, ?, ?, ?)";
        db_conn.query(query,[quiz_name, plannedTrainingID, subCategoryID, quizType, creator],callback);
    }
};

// UPDATE a quiz
exports.update_quiz = function (quiz_name, plannedTrainingID, subCategoryID, quizType, creator, quiz_id, callback) {
    var query = "UPDATE quiz SET quiz_name = ?, plannedTrainingID = ?, subCategoryID = ?, quizType = ?, creator = ? WHERE quizID = ?";
    db_conn.query(query, [quiz_name, plannedTrainingID, subCategoryID, quizType, creator, quiz_id], callback);
};

// DELETE a quiz
exports.delete_quiz = function (quiz_id, callback) {
    var query = "DELETE FROM quiz WHERE quizID = " + quiz_id;

    db_conn.query(query, callback);
};

// READ user quiz details
exports.quiz_details = function (user_id, quiz_id, planned_training_id, callback) {

    var tmp_query = "";

    if(planned_training_id){
        tmp_query = "AND plannedTrainingID = " + planned_training_id;
    }

    var query = "SELECT * FROM dv_portal_db.user_quiz_view uqv WHERE cuid = '" + user_id + "' AND quizID = " + quiz_id + " " + tmp_query;

    db_conn.query(query, callback);

};

// Get Quiz Form
exports.quiz_form = function (quiz_id, callback) {

    var query = "SELECT * FROM dv_portal_db.quiz_form_view qfv WHERE qfv.`quizID` = ?";

    db_conn.query(query, [quiz_id], callback);
};

exports.correct_quiz = function (user_id, quizId, ptId, score, user_response, callback) {

    var query = "UPDATE user_quiz SET score = ?, quizTaken = 1, dateTakingQuiz = NOW() WHERE cuid = ? AND quizID = ?;";

    query += "INSERT INTO user_question(cuid, questionID, propositionID, answerText, quizID, plannedTrainingID) " +
        "VALUES ('" + user_id + "', " + user_response[0].questionID + ", " +  user_response[0].response + ", NULL, " + quizId + ", " + ptId + ")";

    for(var i = 1; i < user_response.length; i++){
        query += ",('" + user_id + "', " + user_response[i].questionID + ", " +  user_response[i].response + ", NULL, " + quizId + ", " + ptId + ")";
    }

    db_conn.query(query, [score, user_id, quizId], callback);
};

// READ a quiz
exports.get_quiz_questions = function (quiz_id, callback) { // QuizID to read from DB
    db_conn.query("SELECT * FROM question WHERE quizID = ?", [quiz_id], callback);
};


// READ ALL question
exports.get_all_question = function (callback) {
    db_conn.query("SELECT * FROM question", callback);
};

// READ a question
exports.get_question = function (question_id, callback) { // questionID to read from DB
    db_conn.query("SELECT * FROM question WHERE questionID = ?", [question_id], callback);
};

// CREATE a question
exports.add_question = function (question_title, quizID, question_type, callback) {
    var query = "INSERT INTO question(question_title, quizID, question_type) VALUES (?, ?, ?)";
    db_conn.query(query,[question_title, quizID, question_type],callback);
};

// UPDATE a question
exports.update_question = function (question_id, question_title, quizID, question_type, callback) {
    var query = "UPDATE question SET question_title = ?, quizID = ?, question_type = ? WHERE questionID = ?; DELETE FROM proposition WHERE questionID = ?;";
    var res = db_conn.query(query, [question_title, quizID, question_type, question_id, question_id], callback);
};

// DELETE a question
exports.delete_question = function (question_id, callback) {
    var query = "DELETE FROM proposition WHERE questionID = ?; DELETE FROM question WHERE questionID = ?";
    db_conn.query(query, [question_id, question_id], callback);
};


// CREATE a proposition
exports.add_proposition = function (propositions, questionID, callback) {
    var query = "INSERT INTO proposition(proposition_title, questionID, isCorrect) VALUES ('" + propositions[0].text + "', " + questionID + ", " + propositions[0].checked + ")";

    for(var i = 1; i < propositions.length; i++){
        query += ",('" + propositions[i].text + "', " + questionID + ", " + propositions[i].checked + ")";
    }

    db_conn.query(query, callback);
};

// DELETE a proposition
exports.delete_proposition = function (proposition_id, callback) {
    var query = "DELETE FROM proposition WHERE propositionID = " + proposition_id;
    db_conn.query(query, callback);
};

exports.get_question_propositions = function (questionID, callback) {
    var query = "SELECT * FROM proposition WHERE questionID = " + questionID;

    db_conn.query(query, callback);
};

exports.user_quiz_evaluation = function (cuid, quiz_id, user_response, callback) {
    var query = "SELECT * FROM proposition WHERE questionID = " + questionID;

    db_conn.query(query, callback);
};

exports.add_quiz_participants = function (quizId, participants, pt_id, callback) {
    var query = "INSERT INTO user_quiz(cuid, quizID, plannedTrainingID, score, quizTaken, quiz_hidden) VALUES ('" + participants[0].cuid + "', " + quizId + ", " + pt_id + ", 0, 0, 0)";

    for(var i = 1; i < participants.length; i++){
        query += ",('" + participants[i].cuid + "', " + quizId + ", " + pt_id + ", 0, 0, 0)";
    }

    db_conn.query(query, callback);
};

exports.get_takers = function (quiz_id, callback) {

    var query = "SELECT * FROM admin_quiz_takers_view WHERE quizID = " + quiz_id;

    db_conn.query(query, callback);
};

exports.hideQuiz = function (user_id, quiz_ids, callback) {
    var query = "UPDATE user_quiz SET hidden = 1 WHERE cuid = '" + user_id + "' AND quizID IN (" + quiz_ids[0];

    for(var i = 1; i < quiz_ids.length; i++){
        query += ', ' + quiz_ids[i];
    }
    query += ')';

    db_conn.query(query, callback);

};

exports.quiz_users = function (quiz_id, callback) {
    db_conn.query("SELECT * FROM user_q_view WHERE quizID = " + quiz_id, callback);
};