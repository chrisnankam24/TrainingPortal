/**
 * Created by user on 11/11/2016.
 */

var quizModel = require('../models/quiz'); // For training info
var emailService = require('../config/email');

exports.get_quizList = function(req, res){
    //group, show_hidden, category, sub_category, creation_ts
    var cuid =  req.session.data.cuid;
    var group = req.body.group;
    var show_hidden = req.body.show_hidden;
    var category = req.body.category;
    var sub_category = req.body.sub_category;
    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    quizModel.user_quiz_queryBuilder(cuid, group, show_hidden, category, sub_category, start_ts, offset, search, function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            var result = [];


            for(var i = 0; i < rows.length; i++){
                if(rows[i].training_taken == 1 || rows[i].training_taken == null){
                    rows[i].quizTaken = rows[i].quizTaken.readUIntBE(0, 1);
                    rows[i].quiz_hidden = rows[i].quiz_hidden.readUIntBE(0, 1);
                    result.push(rows[i]);
                }else{

                }
            }
            res.json({
                success: true,
                data: result
            });
        }
    });
};

exports.get_adminQuizList = function(req, res){

    var start_ts = req.body.start_ts;
    var offset = req.body.offset;
    var search = req.body.search;

    quizModel.quiz_queryBuilder(start_ts, offset, search, function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            for(var i = 0; i < rows.length; i++){
                rows[i].can_modif = false;
                if(rows[i].uCreator == req.session.data.cuid){
                    rows[i].can_modif = true;
                }
            }

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.get_quiz_details = function(req, res){

    var cuid =  req.session.data.cuid;
    var quiz_id = req.body.quiz_id;
    var planned_training_id = req.body.planned_training_id;

    quizModel.quiz_details(cuid, quiz_id, planned_training_id, function(err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            rows[0].quiz_hidden = rows[0].quiz_hidden.readUIntBE(0, 1);
            rows[0].quizTaken = rows[0].quizTaken.readUIntBE(0, 1);

            rows[0].can_still_take = true;

            if(rows[0].trainingEndDate != null){
                var current_date = new Date();
                var end_date = new Date(rows[0].trainingEndDate);

                if( +end_date > +current_date){
                    rows[0].can_still_take = false;
                }
            }

            res.json({
                success: true,
                data: rows[0]
            });
        }
    });
};

exports.get_quiz_form = function(req, res){

    var quiz_id = req.body.quiz_id;
    var planned_training_id = req.body.planned_training_id;

    quizModel.quiz_form(quiz_id, function(err, rows) {
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
                result.quiz_id = quiz_id;
                result.plannedTrainingID = planned_training_id;
                result.formName = rows[0].quiz_name;

                // Get all questions
                var questions = [];
                for(var i = 0; i < rows.length; i++) {
                    var is_included = false;
                    for(var j = 0; j < questions.length; j++){
                        if(questions[j].questionID == rows[i].questionID){
                            is_included = true;
                            break;
                        }
                    }
                    if(is_included == false){
                        questions.push({
                            questionID: rows[i].questionID,
                            questionText: rows[i].question_title,
                            questionType: rows[i].question_type,
                            questionPropositions: []
                        });
                    }
                }

                // Get all Propositions
                for(var k = 0; k < rows.length; k++) {
                    for(var t = 0; t < questions.length; t++) {
                        if(questions[t].questionID == rows[k].questionID){
                            questions[t].questionPropositions.push({
                                propositionID: rows[k].propositionID,
                                propositionText: rows[k].proposition_title,
                                propositionCorrect: rows[k].isCorrect
                            });
                            break;
                        }
                    }
                }

                result.questions = questions;
            }

            res.json({
                success: true,
                data: result
            });
        }
    });
};

exports.correct_quiz = function (req, res) {

    var quiz_id = req.body.quiz_id;
    var cuid =  req.session.data.cuid;
    var planned_training_id = req.body.planned_training_id;
    var user_response = req.body.user_response;

    var score = 0;
    for(var i = 0; i < user_response.length; i++){
        if(user_response[i].response == user_response[i].correctPropositionID){
            score = score + 1;
        }
    }

    score = (20 * score / user_response.length);

    quizModel.correct_quiz(cuid, quiz_id, planned_training_id, score, user_response, function(err, rows) {
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

exports.get_quiz = function (req, res) {

    var quiz_id = req.query.id;

    if(quiz_id == 'all'){
        quizModel.get_all_quiz(function (err, rows) {
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
        quizModel.get_quiz(quiz_id, function (err, rows) {
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

exports.add_quiz = function (req, res) {

    var quiz_name = req.body.quiz_name;
    var plannedTrainingID = req.body.plannedTrainingID;
    var subCategoryID = req.body.subCategoryID;
    var quizType = req.body.quizType;
    var creator =  req.session.data.cuid;
    var participants = req.body.participants;
    if(quizType == 'Open') {
        plannedTrainingID = 'NULL';
    }

    quizModel.add_quiz(quiz_name, plannedTrainingID, subCategoryID, quizType, creator, function (err, rows) {
        if (err) {
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        } else {

            var quizId = rows.insertId;

            quizModel.add_quiz_participants(quizId, participants, plannedTrainingID, quizCallback(quizType, quizId, req, res));
        }
    });
};

function quizCallback(quizTyp, quizId, req, res) {

    var quizType = quizTyp;
    var quizID = quizId;

    return function (err, rows) {

        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            if(quizType == 'Open'){
                notify(quizID);
            }
            res.json({
                success: true,
                data: rows
            });
        }
    }
}

exports.update_quiz = function (req, res) {

    var quiz_id = req.body.quiz_id;
    var quiz_name = req.body.quiz_name;
    var plannedTrainingID = req.body.plannedTrainingID;
    var subCategoryID = req.body.subCategoryID;
    var quizType = req.body.quizType;
    var creator =  req.session.data.cuid;

    quizModel.update_quiz(quiz_name, plannedTrainingID, subCategoryID, quizType, creator, quiz_id, function (err, rows) {
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

exports.delete_quiz = function (req, res) {

    var quiz_id = req.query.id;

    quizModel.delete_quiz(quiz_id, function (err, rows) {
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

exports.get_quiz_questions = function (req, res) {

    var quiz_id = req.body.quizID;

    quizModel.get_quiz_questions(quiz_id, function (err, rows) {
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

exports.get_question = function (req, res) {

    var quiz_id = req.query.id;

    if(quiz_id == 'all'){
        quizModel.get_all_question(function (err, rows) {
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
        quizModel.get_question(quiz_id, function (err, rows) {
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

exports.add_question = function (req, res) {

    var question_title = req.body.question_text;
    var is_mcq = req.body.is_mcq;
    var propositions = req.body.propositions;
    var quizID = req.body.quiz_id;
    var question_type = 'MCQ';
    if(is_mcq == false){
        question_type = 'Open';
    }

    quizModel.add_question(question_title, quizID, question_type, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            var questionId = rows.insertId;

            if(propositions.length > 0){
                quizModel.add_proposition(propositions, questionId, function (err, rows) {
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
                })
            }else{
                res.json({
                    success: true,
                    data: rows
                });
            }
        }
    });
};

exports.update_question = function (req, res) {

    var question_id = req.body.question_id;
    var question_title = req.body.question_text;
    var is_mcq = req.body.is_mcq;
    var propositions = req.body.propositions;
    var quizID = req.body.quiz_id;
    var question_type = 'MCQ';
    if(is_mcq == false){
        question_type = 'Open';
    }


    quizModel.update_question(question_id, question_title, quizID, question_type,
        get_question_update_callback(question_id, propositions, req, res));
};

function get_question_update_callback(q_id, propositions, req, res) {

    var question_id = q_id;

    return function (err, rows) {
        if (err) {
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        } else {

            if (propositions.length > 0){
                quizModel.add_proposition(propositions, question_id, function (err, rows) {
                    if (err) {
                        // Error querying DB
                        res.status(403).send({
                            success: false,
                            message: err
                        });
                    } else {
                        res.json({
                            success: true,
                            data: rows
                        });
                    }
                })
            } else {
                res.json({
                    success: true,
                    data: rows
                });
            }


        }
    }
}

exports.delete_question = function (req, res) {

    var question_id = req.query.id;

    quizModel.delete_question(question_id, function (err, rows) {
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

exports.get_question_propositions = function (req, res) {

    var question_id = req.body.question_id;

    quizModel.get_question_propositions(question_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{
            var propositions = [];

            for(var i = 0; i < rows.length; i++){
                propositions.push(
                    {
                        id: 'proposition_' + i,
                        text: rows[i].proposition_title,
                        checked: rows[i].isCorrect
                    }
                );
            }

            res.json({
                success: true,
                data: propositions
            });
        }
    });
};

exports.user_quiz_evaluation = function (req, res) {

    var cuid =  req.session.data.cuid;
    var quiz_id = req.body.quiz_id;
    var planned_training_id = req.body.planned_training_id;
    var user_response = req.body.user_response;

    quizModel.user_quiz_evaluation(cuid, quiz_id, user_response, function (err, rows) {
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

exports.get_takers = function (req, res) {

    var quiz_id = req.query.quiz_id;

    quizModel.get_takers(quiz_id, function (err, rows) {
        if(err){
            // Error querying DB
            res.status(403).send({
                success: false,
                message: err
            });
        }else{

            for(var i = 0; i < rows.length; i++){
                rows[i].quizTaken = rows[i].quizTaken.readUIntBE(0, 1);
                rows[i].gender = rows[i].gender.readUIntBE(0, 1);
            }

            res.json({
                success: true,
                data: rows
            });
        }
    });
};

exports.hideQuiz = function (req, res) {

    var cuid =  req.session.data.cuid;
    var quiz_ids = req.body.ids;

    quizModel.hideQuiz(cuid, quiz_ids, function (err, rows) {
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

function notify(quizID) {

    quizModel.quiz_users(quizID, function (err, rows) {
        if (err) {

            // Error querying DB

        } else {

            var adminMail =  req.session.data.email;

            var admin_name =  req.session.data.firstName + ' ' + req.session.data.lastName;

            var quiz_name = '';

            for (var i = 0; i < rows.length; i++) {

                var email = rows[i].email;
                var trainee_name = rows[i].firstName + ' ' + rows[i].lastName;
                quiz_name = rows[i].quiz_name;

                emailService.sendQuizMail(email, trainee_name, quiz_name);
            }

            emailService.sendNotifMail(adminMail, admin_name, quiz_name, rows.length);

        }
    });
};