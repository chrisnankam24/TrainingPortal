/**
 * Created by user on 12/28/2016.
 */
var express = require('express');
var exTrainerRouter = express.Router();
var exTrainerController = require('../controllers/ex_trainers');

exTrainerRouter.route('/exTrainerList')
    .post(exTrainerController.get_exTrainerList);

exTrainerRouter.route('/')
    .get(exTrainerController.get_exTrainer)
    .post(exTrainerController.add_exTrainer)
    .delete(exTrainerController.delete_exTrainer)
    .put(exTrainerController.update_exTrainer);

module.exports = exTrainerRouter;