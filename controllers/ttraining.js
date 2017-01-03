/**
 * Created by user on 11/7/2016.
 */

var trainingModel = require('../models/ttraining'); // For training info
var emailService = require('../config/email');

// Administrivia

//////////////// Training

exports.get_training = function (req, res) {

    var training_id = req.query.id;
    
    if(training_id == 'all'){
        trainingModel.get_all_training(function (err, rows) {
            if(err){
                // Error querying DB
                res.status(403).send({
                    success: false,
                    message: err
                });
            }else{
                res.json({
                    success: true,
                    data: rows
                });
            }
        });
    }else{
        trainingModel.get_training(training_id, function (err, rows) {
            if(err){
                // Error querying DB
                res.status(403).send({
                    success: false,
                    message: err
                });
            }else{
                res.json({
                    success: true,
                    data: rows
                });
            }
        });
    }
};

exports.add_training = function (req, res) {

    var training_name = req.body.training_name;

    trainingModel.add_training(training_name, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.update_training = function (req, res) {

    var training_id = req.body.training_id;
    var training_name = req.body.training_name;

    trainingModel.update_training(training_id, training_name, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.delete_training = function (req, res) {

    var training_id = req.query.id;

    trainingModel.delete_training(training_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.set_pt_training = function (req, res) {

    var trainingID = req.body.trainingID;
    var training_code = req.body.training_code;
    var training_type = req.body.training_type;
    var trans_mode = req.body.trans_mode;
    var training_audience = req.body.training_audience;
    var session_duration = req.body.session_duration;
    var is_site = req.body.is_site;
    var evaluationFormID = req.body.evaluationFormID;
    var training_sites = req.body.training_sites; // site_id, site_sessions
    var conference_num = req.body.conference_no;
    var e_learning = req.body.e_learning;
    var resource_ids = req.body.resource_ids;

    if(trans_mode == 'E-LEARNING'){
        conference_num = e_learning;
    }

    var start_date = training_sites[0].site_sessions[0].session_start_date;
    var end_date = training_sites[0].site_sessions[0].session_end_date;

    for(var i = 0; i < training_sites.length; i++){
        for(var j = 0; j < training_sites[i].site_sessions.length; j++){
            if(start_date > training_sites[i].site_sessions[j].session_start_date){
                start_date = training_sites[i].site_sessions[j].session_start_date;
            }
            if(end_date < training_sites[i].site_sessions[j].session_end_date){
                end_date = training_sites[i].site_sessions[j].session_end_date;
            }
        }
    }

    trainingModel.insert_planned_training(training_type, trans_mode, start_date, end_date, session_duration,
        conference_num, trainingID, training_code, evaluationFormID, training_audience, function (err, rows) {

            if(err){
                // Error querying DB
                res.status(403).send({
                    success: false,
                    message: err
                });
            }else{

                var pt_id = rows.insertId;

                for(var i = 0; i < training_sites.length; i++){
                    for(var j = 0; j < training_sites[i].site_sessions.length; j++){

                        var trainingLocationID = training_sites[i].trainingLocationID;
                        var session_start_date = training_sites[i].site_sessions[j].session_start_date;
                        var session_end_date = training_sites[i].site_sessions[j].session_end_date;
                        var participants = training_sites[i].site_sessions[j].session_participants;
                        var trainers = training_sites[i].site_sessions[j].session_trainers;

                        trainingModel.insert_training_session(session_start_date, session_end_date, trainingLocationID, get_callback(participants, pt_id, trainers, req, res));

                    }
                }

                if(resource_ids[0] != ''){
                    trainingModel.insert_training_resources(pt_id, resource_ids, function (err, rows) {});
                }
            }

        });
};

function get_callback(participants, pt_id, trainers, req, res) {

    return function (err, rows) {

        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: req.body
            });
        }else {

            var ts_id = rows.insertId;

            trainingModel.insert_ts_pt(ts_id, pt_id, function (err, rows) {

                if(err){

                    // Error querying DB
                    res.status(403).send({
                        success: false,
                        message: err
                    });

                }else{

                }

            });

            trainingModel.insert_user_training_session(participants, ts_id, function (err, rows) {

                if(err){
                    // Error querying DB
                    res.status(403).send({
                        success: false,
                        message: err
                    });
                }else{

                    try{
                        res.json({
                            success: true,
                            data: rows
                        });
                    }catch(err){

                    }

                }

            });

            var sess_trainers = [];

            if(trainers.length > 0){

                console.log('Inserting trainers');

               for(var k = 0; k < trainers.length; k++){
                   var trainer = trainers[k];

                   var extrainerID = 'NULL';

                   var cuid = 'NULL';

                   var trainerType = false;

                   if(trainer.is_external == true){
                       extrainerID = trainer.id;
                       trainerType = true;
                   }else{
                       cuid = trainer.id;
                   }

                   sess_trainers.push({
                       extrainerID: extrainerID,
                       trainerType: trainerType,
                       cuid: cuid
                   });
               }

               trainingModel.insert_session_trainers(ts_id, sess_trainers, function (err, rows) {

                   if(err){
                       // Error querying DB
                       try {

                           res.status(403).send({
                               success: false,
                               message: err
                           });

                       }catch(er){

                       }
                   }else{

                       try{
                           res.json({
                               success: true,
                               data: rows
                           });
                       }catch(err){

                       }

                   }

               });
           }
        }

    };

}

exports.get_all_trainers = function (req, res) {

    trainingModel.ex_trainers(function (err, rows) {

        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            var ext_trainers = [];
            for(var i = 0; i < rows.length; i++){
                ext_trainers.is_external = true;
                ext_trainers.push({
                    id: rows[i].trainerID,
                    firstName: rows[i].firstName,
                    lastName: rows[i].lastName,
                    is_external: true
                });
            }

            trainingModel.int_trainers(get_trainers_callback(ext_trainers, res));

        }

    });

};

function get_trainers_callback(ext_trainers, res) {

    return function (err, rows) {

        if(err){
            // Error querying DB
            try {
                res.status(403).send({
                    success: false,
                    message: err
                });
            }catch(er){

            }
        }else{

            var int_trainers = [];
            for(var i = 0; i < rows.length; i++){
                int_trainers.is_external = true;
                int_trainers.push({
                    id: rows[i].cuid,
                    firstName: rows[i].firstName,
                    lastName: rows[i].lastName,
                    is_external: false
                });
            }


            rows = int_trainers.concat(ext_trainers);

            try{
                res.json({
                    success: true,
                    data: rows
                });
            }catch(err){

            }
        }

    }

}

exports.get_trainingList = function(req, res){

    //group, show_hidden, filter_type, start_ts, end_ts,
    var cuid =  req.session.data.cuid;
    var group = req.body.group;
    var show_hidden = req.body.show_hidden;
    var filter_type = req.body.filter_type;
    var start_ts = req.body.start_ts;
    var end_ts = req.body.end_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    trainingModel.user_training_queryBuilder(cuid, group, show_hidden, filter_type, start_ts, end_ts, offset, search, function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            for(var i = 0; i < rows.length; i++){
                rows[i].trainingTaken = rows[i].trainingTaken.readUIntBE(0, 1);
                rows[i].hidden = rows[i].hidden.readUIntBE(0, 1);
            }

            var current_day = new Date();
            current_day = current_day.toString('yyyy-mm-dd');

            for(var i = 0; i < rows.length; i++){
                if(rows[i].trainingTaken == 1){
                    rows[i].colorCode = '#E0F2F1';
                }else if(rows[i].startTS.toString('yyyy-mm-dd') >= current_day){
                    rows[i].colorCode = '#FFF3E0';
                }else{
                    rows[i].colorCode = '#FFCCBC';
                }
                rows[i].colorCode = 'none';
            }

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_subsTrainingList = function(req, res){

    var user_id = req.body.user_id;
    var start_ts = req.body.start_ts;
    var end_ts = req.body.end_ts;
    var offset = req.body.offset;

    trainingModel.user_subs_training_queryBuilder(user_id, start_ts, end_ts, offset, function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            for(var i = 0; i < rows.length; i++){
                rows[i].trainingTaken = rows[i].trainingTaken.readUIntBE(0, 1);
            }

            var current_day = new Date();
            current_day = current_day.toString('yyyy-mm-dd');

            for(var i = 0; i < rows.length; i++){
                if(rows[i].trainingTaken == 1){
                    rows[i].status = 'Taken';
                }else if(rows[i].startTS.toString('yyyy-mm-dd') >= current_day){
                    rows[i].status = 'Pending';
                }else{
                    rows[i].status = 'Overdue';
                }
            }

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_subsQuizList = function(req, res){

    var user_id = req.body.user_id;
    var start_ts = req.body.start_ts;
    var end_ts = req.body.end_ts;
    var offset = req.body.offset;

    trainingModel.user_subs_quiz_queryBuilder(user_id, start_ts, end_ts, offset, function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_dayilyTrainingList = function(req, res){

    //group, show_hidden, filter_type, start_ts, end_ts,
    var cuid =  req.session.data.cuid;
    var offset = req.body.offset;
    var sessions = req.body.sessions;

    trainingModel.session_training_queryBuilder(cuid, offset, sessions, function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            for(var i = 0; i < rows.length; i++){
                rows[i].trainingTaken = rows[i].trainingTaken.readUIntBE(0, 1);
                rows[i].hidden = rows[i].hidden.readUIntBE(0, 1);
            }

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_adminTrainingList = function(req, res){

    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    trainingModel.all_training_queryBuilder(start_ts, offset, search, function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_yearlyTrainingProgram = function (req, res) {

    var cuid = req.session.data.cuid;
    var year = req.body.year;

    trainingModel.yearly_triaining_info(cuid, year, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_subsYearlyTrainingProgram = function (req, res) {

    var cuid =  req.body.user_id;
    var year = req.body.year;

    trainingModel.yearly_triaining_info(cuid, year, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_sessionTrainingInfo = function (req, res) {
    var cuid =  req.session.data.cuid;
    var session_id = req.body.session_id;
    trainingModel.session_training_info(cuid, session_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            var training = rows[0];

            var can_take = -2;

            training.trainingTaken = training.trainingTaken.readUIntBE(0, 1);
            training.hidden = training.hidden.readUIntBE(0, 1);

            var tmp_current_date = new Date();
            var current_date = new Date(tmp_current_date);
            var start_date = new Date(training.startTS);
            start_date.setHours(start_date.getHours() - 3);
            var end_date = new Date(training.endTS);

            if(training.trainingTaken == 0 && +start_date <= +current_date && +end_date >= +current_date){
                can_take = 1; // Can register
            }else if(training.trainingTaken == 1){
                can_take = 0; // Training Registered
            }else if(training.trainingTaken == 0 && +end_date < +current_date){
                can_take = 2; // Training Overdue
            }else if(training.trainingTaken == 0 && +start_date > +current_date){
                can_take = 3; // Upcoming training
            }

            training.can_still_take = can_take;

            res.json({
                success: true,
                data: training
            });
        }
    });
};

exports.get_training_ext_trainers = function (req, res) {

    var session_id = req.body.session_id;

    trainingModel.training_ex_trainers(session_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            for(var i = 0; i < rows.length; i++){
                rows[i].trainerType = rows[i].trainerType.readUIntBE(0, 1);
                rows[i].gender = rows[i].gender.readUIntBE(0, 1);
            }

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_training_int_trainers = function (req, res) {

    var session_id = req.body.session_id;

    trainingModel.training_int_trainers(session_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            for(var i = 0; i < rows.length; i++){
                rows[i].trainerType = rows[i].trainerType.readUIntBE(0, 1);
                rows[i].gender = rows[i].gender.readUIntBE(0, 1);
            }

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_training_resources = function (req, res) {

    var session_id = req.body.session_id;

    trainingModel.training_resources(session_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_training_quiz = function (req, res) {

    var session_id = req.body.session_id;

    trainingModel.training_quiz(session_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.register_training = function (req, res) {

    var cuid =  req.session.data.cuid;
    var session_id = req.body.session_id;
    var user_code = req.body.user_code;

    trainingModel.training_code(cuid, session_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            var training_code = rows[0].trainingCode;
            if(user_code == training_code){
                // Correct code
                trainingModel.set_training_taken(cuid, session_id, function (err, rows) {

                    if(err){
                        // Error querying DB
                        res.status(403).send({
                            success: false,
                            message: err
                        });
                    }else{

                        var data = {};
                        data.session_id = session_id;
                        data.can_still_take = 0;

                        res.json({
                            success: true,
                            data: data
                        });
                    }
                });
            }else{
                // Error querying DB
                res.status(403).send({
                    success: false,
                    message: "Failed"
                });
            }
        }
    });
};

exports.training_form = function (req, res) {

    var session_id = req.body.session_id;

    trainingModel.training_evaluation_form(session_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            // Result variable
            var result = {};

            if(rows.length > 0) {
                result.session_id = session_id;
                result.plannedTrainingID = rows[0].plannedTrainingID;
                result.evaluationFormID = rows[0].evaluationFormID;
                result.formName = rows[0].formName;

                // Get all criteria
                var criteria = [];
                for(var i = 0; i < rows.length; i++) {
                    var is_included = false;
                    for(var j = 0; j < criteria.length; j++){
                        if(criteria[j].criteriaID == rows[i].evaluationCriteriaID){
                            is_included = true;
                            break;
                        }
                    }
                    if(is_included == false){
                        criteria.push({
                            criteriaID: rows[i].evaluationCriteriaID,
                            criteriaText: rows[i].criteria,
                            criteriaPropositions: []
                        });
                    }
                }

                // Get all Propositions
                for(var k = 0; k < rows.length; k++) {
                    for(var t = 0; t < criteria.length; t++) {
                        if(criteria[t].criteriaID == rows[k].evaluationCriteriaID){
                            criteria[t].criteriaPropositions.push({
                                propositionID: rows[k].criteriaPropositionID,
                                propositionText: rows[k].criteria_proposition
                            });
                            break;
                        }
                    }
                }

                result.criteria = criteria;
            }

            res.json({
                success: true,
                data: result
            });
        }
    });
};

exports.has_evaluated = function (req, res) {

    var cuid =  req.session.data.cuid;
    var plannedTrainingID = req.body.plannedTrainingID;

    trainingModel.has_evaluated(cuid, plannedTrainingID, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            // Result variable
            var result = rows.length > 0;

            res.json({
                success: true,
                data: result
            });
        }
    });
};

exports.user_training_evaluation = function (req, res) {

    var cuid =  req.session.data.cuid;
    var plannedTrainingID = req.body.plannedTrainingID;
    var evaluationFormID = req.body.evaluationFormID;
    var user_response = req.body.user_response;

    trainingModel.insert_user_training_criteria(cuid, plannedTrainingID, user_response, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            trainingModel.insert_user_training_comment(cuid, plannedTrainingID, evaluationFormID, function (err, rows) {
                if(err){
                    // Error querying DB
                    // res.status(403).send({
                    //     success: false,
                    //     message: err
                    // });
                }else{

                    // res.json({
                    //     success: true,
                    //     data: rows
                    // });
                }
            });

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_planned_training = function (req, res) {

    var training_id = req.query.id;

    if(training_id == 'all'){
        trainingModel.get_all_planned_training(function (err, rows) {
            if(err){
                // Error querying DB
                res.status(403).send({
                    success: false,
                    message: err
                });
            }else{
                res.json({
                    success: true,
                    data: rows
                });
            }
        });
    }else{
        trainingModel.get_planned_training(training_id, function (err, rows) {
            if(err){
                // Error querying DB
                res.status(403).send({
                    success: false,
                    message: err
                });
            }else{
                res.json({
                    success: true,
                    data: rows
                });
            }
        });
    }
};

exports.delete_planned_training = function (req, res) {

    var pt_id = req.query.id;

    trainingModel.delete_planned_training(pt_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.hideTraining = function (req, res) {

    var cuid =  req.session.data.cuid;
    var training_ids = req.body.ids;

    trainingModel.hideTraining(cuid, training_ids, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_ptList = function(req, res){

    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    if(search != undefined){
        offset = 0;
    }

    trainingModel.all_ptTraining_queryBuilder(start_ts, offset, search, function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_pt_sessions = function (req, res) {

    var pt_id = req.query.pt_id;

    trainingModel.get_pt_sessions(pt_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_session_participants = function (req, res) {

    var session_id = req.query.session_id;

    trainingModel.get_session_participants(session_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            for(var i = 0; i < rows.length; i++){
                rows[i].trainingTaken = rows[i].trainingTaken.readUIntBE(0, 1);
            }

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.session_taking = function (req, res) {

    var user_id =  req.body.user_id;
    var sessionID = req.body.sessionID;
    var taken = req.body.taken;

    trainingModel.session_taking(user_id, sessionID, taken, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_usersTrainingKPI = function(req, res){

    var date = req.body.date;
    var services = req.body.services;

    trainingModel.users_training_table(date, services, function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_trainingKPI = function(req, res){

    trainingModel.training_table(function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_training_report = function (req, res) {

    trainingModel.get_all_eval_reports(function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.admin_training_evaluation = function (req, res) {

    var pt_id = req.body.plannedTrainingID;

    trainingModel.pt_evaluation(pt_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            trainingModel.pt_evaluation_criteria_propositions(rows[0].evaluationFormID, evalCallback(rows, res));

        }
    });
};

function evalCallback(pt_Eval, res) {

    return function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else {

            var userInfo = [];
            var criteriaInfo = [];

            // Get users, propositions and criterias
            var tmpUsers = new Set();
            var tmpCriteria = new Set();

            for(var i = 0; i < pt_Eval.length; i++){
                tmpUsers.add(pt_Eval[i].cuid);
            }

            for(var i = 0; i < rows.length; i++){
                tmpCriteria.add(rows[i].evaluationCriteriaID);
            }

            tmpCriteria.forEach(function (e) {
                criteriaInfo.push({
                    'criteriaID': e,
                    'criteriaText': "",
                    'proposition1Count': 0,
                    'proposition2Count': 0,
                    'proposition3Count': 0,
                    'proposition4Count': 0,
                    'proposition1Text': '',
                    'proposition2Text': '',
                    'proposition3Text': '',
                    'proposition4Text': ''
                });
            });

            tmpUsers.forEach(function (e) {
                userInfo.push({
                    'cuid': e,
                    'firstName': e,
                    'lastName': e,
                    'comment1': "",
                    'comment2': "",
                    'comment3': "",
                    'comment4': ""
                });
            });

            for(var i = 0; i < pt_Eval.length; i++){

                var prop = pt_Eval[i].criteriaPropositionID % 4;
                if(prop == 0) {
                    prop = 4;
                }

                for(var k = 0; k < userInfo.length; k++){
                    if(userInfo[k].cuid == pt_Eval[i].cuid){
                        userInfo[k].firstName = pt_Eval[i].firstName;
                        userInfo[k].lastName = pt_Eval[i].lastName;
                        userInfo[k]['comment' + prop] =  pt_Eval[i].criteriacomment;
                    }
                }

                for(var j = 0; j < criteriaInfo.length; j++){
                    if(pt_Eval[i].evaluationCriteriaID == criteriaInfo[j].criteriaID){
                        criteriaInfo[j].criteriaText = pt_Eval[i].criteria;
                        criteriaInfo[j]['proposition' + prop + 'Count']++;
                    }
                    criteriaInfo[j]['proposition' + prop + 'Text'] =  pt_Eval[i].criteria_proposition;
                }
            }

            var response = {
              userInfo: userInfo,
              criteriaInfo: criteriaInfo
            };

            res.json({
                success: true,
                data: response
            });

        }
    }

}

exports.notify = function (req, res) {

    var pt_id = req.body.plannedTrainingID;

    trainingModel.pt_users(pt_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            var adminMail =  req.session.data.email;

            var admin_name =  req.session.data.firstName + ' ' + req.session.data.lastName;

            var training_name = '';

            for(var i = 0; i < rows.length; i++){
                var email = rows[i].email;
                var trainee_name = rows[i].firstName + ' ' + rows[i].lastName;
                training_name = rows[i].training_name;
                var start_date = new Date(rows[i].startDate);
                var end_date = new Date(rows[i].endDate);

                var dateFormat = require('dateformat');

                var start_tm = dateFormat(start_date, "dddd, mmmm dS, yyyy, hh:MM:ss");
                var end_tm = dateFormat(end_date, "dddd, mmmm dS, yyyy, hh:MM:ss");

                emailService.sendMail(email, trainee_name, training_name, start_tm, end_tm);
            }

            emailService.sendNotifMail(adminMail, admin_name, training_name, rows.length);

            res.json({
                success: true,
                data: rows
            });
        }
    });
};