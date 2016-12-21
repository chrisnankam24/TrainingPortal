/**
 * Created by user on 11/16/2016.
 */

// Import Database connection
database = require('../config/database');

// Retreive database connection
db_conn = database.connection;

//------------- Trans Mode CRUD Operations ----------------------//
// READ ALL Trans Mode
exports.get_all_trans_mode = function (callback) {
    db_conn.query("SELECT * FROM transmission_mode", callback);
};

// READ a Trans Mode
exports.get_trans_mode = function (tm_id, callback) {
    db_conn.query("SELECT * FROM transmission_mode WHERE transmissionModeID = ?", [tm_id], callback);
};

// CREATE a Trans Mode
exports.add_trans_mode = function (trans_mode, callback) {
    db_conn.query("INSERT INTO transmission_mode(transmissionMode) VALUES (?)", [trans_mode],callback);
};

// UPDATE a Trans Mode
exports.update_trans_mode = function (tm_id, trans_mode, callback) {
    db_conn.query("UPDATE transmission_mode SET transmissionMode = ? WHERE transmissionModeID = ?", [trans_mode, tm_id], callback);
};

// DELETE a Trans Mode
exports.delete_trans_mode = function (tm_id, callback) {
    db_conn.query("DELETE FROM transmission_mode WHERE transmissionModeID = ?", [tm_id], callback);
};

//------------- Training Type CRUD Operations ----------------------//
// READ ALL Training Types
exports.get_all_training_type = function (callback) {
    db_conn.query("SELECT * FROM training_type", callback);
};

// READ a Training Type
exports.get_training_type = function (tt_id, callback) {
    db_conn.query("SELECT * FROM training_type WHERE trainingTypeID = ?", [tt_id], callback);
};

// CREATE a Training Type
exports.add_training_type = function (training_type, callback) {
    db_conn.query("INSERT INTO training_type(trainingType) VALUES (?)", [training_type],callback);
};

// UPDATE a Training Type
exports.update_training_type = function (tt_id, training_type, callback) {
    db_conn.query("UPDATE training_type SET trainingType = ? WHERE trainingTypeID = ?", [training_type, tt_id], callback);
};

// DELETE a Training Type
exports.delete_training_type = function (tt_id, callback) {
    db_conn.query("DELETE FROM training_type WHERE trainingTypeID = ?", [tt_id], callback);
};

//------------- Training Audience CRUD Operations ----------------------//
// READ ALL Training Audience
exports.get_all_training_aud = function (callback) {
    db_conn.query("SELECT * FROM training_audience", callback);
};

// READ a Training Audience
exports.get_training_aud = function (ta_id, callback) {
    db_conn.query("SELECT * FROM training_audience WHERE trainingAudienceID = ?", [ta_id], callback);
};

// CREATE a Training Audience
exports.add_training_aud = function (training_aud, callback) {
    db_conn.query("INSERT INTO training_audience(trainingAudience) VALUES (?)", [training_aud],callback);
};

// UPDATE a Training Audience
exports.update_training_aud = function (ta_id, training_aud, callback) {
    db_conn.query("UPDATE training_audience SET trainingAudience = ? WHERE trainingAudienceID = ?", [training_aud, ta_id], callback);
};

// DELETE a Training Audience
exports.delete_training_aud = function (ta_id, callback) {
    db_conn.query("DELETE FROM training_audience WHERE trainingAudienceID = ?", [ta_id], callback);
};


//------------- Training Location CRUD Operations ----------------------//
// READ ALL Training Location
exports.get_all_training_loc = function (callback) {
    db_conn.query("SELECT * FROM training_location", callback);
};

// READ a Training Location
exports.get_training_loc = function (tl_id, callback) {
    db_conn.query("SELECT * FROM training_location WHERE trainingLocationID = ?", [tl_id], callback);
};

// CREATE a Training Location
exports.add_training_loc = function (region, town, site, callback) {
    db_conn.query("INSERT INTO training_location(region, town, site) VALUES (?, ?, ?)", [region, town, site],callback);
};

// UPDATE a Training Location
exports.update_training_loc = function (tl_id, region, town, site, callback) {
    db_conn.query("UPDATE training_location SET region = ?, town = ?, site = ? WHERE trainingLocationID = ?", [region, town, site, tl_id], callback);
};

// DELETE a Training Location
exports.delete_training_loc = function (tl_id, callback) {
    db_conn.query("DELETE FROM training_location WHERE trainingLocationID = ?", [tl_id], callback);
};

//------------- Evaluation Form CRUD Operations ----------------------//
// READ ALL Evaluation Forms
exports.get_all_eval_form = function (callback) {
    db_conn.query("SELECT * FROM evaluation_form", callback);
};

// READ an Evaluation Form
exports.get_eval_form = function (ef_id, callback) {
    db_conn.query("SELECT * FROM evaluation_form WHERE evaluationFormID = ?", [ef_id], callback);
};

// CREATE an Evaluation Form
exports.add_eval_form = function (form_name, callback) {
    db_conn.query("INSERT INTO evaluation_form(formName) VALUES (?)", [form_name],callback);
};

// UPDATE an Evaluation Form
exports.update_eval_form = function (ef_id, form_name, callback) {
    db_conn.query("UPDATE evaluation_form SET formName = ? WHERE evaluationFormID = ?", [form_name, ef_id], callback);
};

// DELETE an Evaluation Form
exports.delete_eval_form = function (ef_id, callback) {
    db_conn.query("DELETE FROM evaluation_form WHERE evaluationFormID = ?", [ef_id], callback);
};

//------------- Sub category CRUD Operations ----------------------//
// READ ALL Sub Category
exports.get_all_sub_category = function (callback) {
    db_conn.query("SELECT * FROM sub_category", callback);
};

// READ an Sub Category
exports.get_sub_cageory = function (sc_id, callback) {
    db_conn.query("SELECT * FROM sub_category WHERE subCategoryID = ?", [sc_id], callback);
};

// CREATE an Sub Category
exports.add_sub_category = function (subCategory, catId, callback) {
    db_conn.query("INSERT INTO sub_category(subCategory, categoryID) VALUES (?, ?)", [subCategory, catId],callback);
};

// UPDATE an Sub Category
exports.update_sub_category = function (subsId, subCategory, catId, callback) {
    db_conn.query("UPDATE sub_category SET subCategory = ?, categoryID = ? WHERE subCategoryID = ?", [subCategory, catId, subsId], callback);
};

// DELETE an Sub Category
exports.delete_sub_category = function (subsId, callback) {
    db_conn.query("DELETE FROM sub_category WHERE subCategoryID = ?", [subsId], callback);
};