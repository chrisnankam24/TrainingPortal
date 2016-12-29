/**
 * Created by user on 12/28/2016.
 */
var express = require('express');
var managementRouter = express.Router();
var managementController = require('../controllers/management');

managementRouter.route('/subsList')
    .post(managementController.get_subsList);
managementRouter.route('/subsDetails')
    .post(managementController.get_subs_details);

module.exports = managementRouter;