/**
 * Created by user on 12/28/2016.
 */
var express = require('express');
var resourceRouter = express.Router();
var resourceController = require('../controllers/resource');

resourceRouter.route('/resourceList')
    .post(resourceController.get_resourceList);

resourceRouter.route('/adminResourceList')
    .post(resourceController.get_adminResourceList);

resourceRouter.route('/incrementCount')
    .post(resourceController.increment_view);

resourceRouter.route('/')
    .put(resourceController.modify_resource);

resourceRouter.route('/')
    .get(resourceController.get_resource);

resourceRouter.route('/')
    .post(resourceController.add_resource);

resourceRouter.route('/')
    .delete(resourceController.delete_resource);

module.exports = resourceRouter;