/**
 * Created by user on 12/28/2016.
 */
var express = require('express');
var trainingRouter = express.Router();
var trainingController = require('../controllers/ttraining');

trainingRouter.route('/trainingList')
    .post(trainingController.get_trainingList);
trainingRouter.route('/hideTraining')
    .post(trainingController.hideTraining);
trainingRouter.route('/dailyTrainingList')
    .post(trainingController.get_dayilyTrainingList);
trainingRouter.route('/subsTrainingList')
    .post(trainingController.get_subsTrainingList);
trainingRouter.route('/subsQuizList')
    .post(trainingController.get_subsQuizList);
trainingRouter.route('/adminTrainingList')
    .post(trainingController.get_adminTrainingList);
trainingRouter.route('/yearlyTrainingProgram')
    .post(trainingController.get_yearlyTrainingProgram);
trainingRouter.route('/subsYearlyTrainingProgram')
    .post(trainingController.get_subsYearlyTrainingProgram);
trainingRouter.route('/trainingInfo')
    .post(trainingController.get_sessionTrainingInfo);
trainingRouter.route('/trainingExtTrainers')
    .post(trainingController.get_training_ext_trainers);
trainingRouter.route('/trainingIntTrainers')
    .post(trainingController.get_training_int_trainers);
trainingRouter.route('/trainingResources')
    .post(trainingController.get_training_resources);
trainingRouter.route('/registerTraining')
    .post(trainingController.register_training);
trainingRouter.route('/trainingQuiz')
    .post(trainingController.get_training_quiz);
trainingRouter.route('/trainingForm')
    .post(trainingController.training_form);
trainingRouter.route('/trainingEvaluated')
    .post(trainingController.has_evaluated);
trainingRouter.route('/trainingEvaluation')
    .post(trainingController.user_training_evaluation);

trainingRouter.route('/PTraining')
    .post(trainingController.set_pt_training);

trainingRouter.route('/sessions')
    .get(trainingController.get_pt_sessions);

trainingRouter.route('/session_participants')
    .get(trainingController.get_session_participants);

trainingRouter.route('/session_taking')
    .post(trainingController.session_taking);

trainingRouter.route('/notify')
    .post(trainingController.notify);

trainingRouter.route('/PTrainingList')
    .post(trainingController.get_ptList);

trainingRouter.route('/trainersList')
    .get(trainingController.get_all_trainers);

trainingRouter.route('/')
    .get(trainingController.get_training)
    .post(trainingController.add_training)
    .delete(trainingController.delete_training)
    .put(trainingController.update_training);

trainingRouter.route('/usersTrainingKPI')
    .post(trainingController.get_usersTrainingKPI);

trainingRouter.route('/trainingKPI')
    .post(trainingController.get_trainingKPI);

trainingRouter.route('/pt/')
    .get(trainingController.get_planned_training)
    .delete(trainingController.delete_planned_training);
trainingRouter.route('/eval_report/')
    .get(trainingController.get_training_report);

trainingRouter.route('/adminTrainingEvaluation/')
    .post(trainingController.admin_training_evaluation);

module.exports = trainingRouter;