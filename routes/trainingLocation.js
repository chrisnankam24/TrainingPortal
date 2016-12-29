/**
 * Created by user on 12/28/2016.
 */
var express = require('express');
var trainingLocationRouter = express.Router();
var trainingLocationController = require('../controllers/training_location');

trainingLocationRouter.route('/trainingLocationList')
    .post(trainingLocationController.get_trainingLocationList);

trainingLocationRouter.route('/')
    .get(trainingLocationController.get_trainingLocation)
    .post(trainingLocationController.add_trainingLocation)
    .delete(trainingLocationController.delete_trainingLocation)
    .put(trainingLocationController.update_trainingLocation);

module.exports = trainingLocationRouter;