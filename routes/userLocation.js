/**
 * Created by user on 12/28/2016.
 */
var express = require('express');
var userLocationRouter = express.Router();
var userLocationController = require('../controllers/user_location');

userLocationRouter.route('/userLocationList')
    .post(userLocationController.get_userLocationList);

userLocationRouter.route('/')
    .get(userLocationController.get_userLocation)
    .post(userLocationController.add_userLocation)
    .delete(userLocationController.delete_userLocation)
    .put(userLocationController.update_userLocation);

module.exports = userLocationRouter;