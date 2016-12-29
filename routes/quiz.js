/**
 * Created by user on 12/28/2016.
 */
var express = require('express');
var quizRouter = express.Router();
var quizController = require('../controllers/quiz');


quizRouter.route('/quizList')
    .post(quizController.get_quizList);
quizRouter.route('/hideQuiz')
    .post(quizController.hideQuiz);
quizRouter.route('/adminQuizList')
    .post(quizController.get_adminQuizList);
quizRouter.route('/quizDetails')
    .post(quizController.get_quiz_details);
quizRouter.route('/quizForm')
    .post(quizController.get_quiz_form);
quizRouter.route('/correctQuiz')
    .post(quizController.correct_quiz);

quizRouter.route('/quizQuestions')
    .post(quizController.get_quiz_questions);

quizRouter.route('/')
    .get(quizController.get_quiz)
    .post(quizController.add_quiz)
    .delete(quizController.delete_quiz)
    .put(quizController.update_quiz);

quizRouter.route('/question/')
    .post(quizController.add_question)
    .delete(quizController.delete_question)
    .put(quizController.update_question);

quizRouter.route('/questionPropositions/')
    .post(quizController.get_question_propositions);

quizRouter.route('/takers')
    .get(quizController.get_takers);


module.exports = quizRouter;