/**
 * Created by user on 12/28/2016.
 */
var express = require('express');
var postRouter = express.Router();
var postController = require('../controllers/post');

postRouter.route('/postList/')
    .post(postController.get_postList);

postRouter.route('/postDetails/')
    .post(postController.postDetails);

postRouter.route('/postTraining/')
    .post(postController.add_post_trainings)
    .delete(postController.postTraining);

postRouter.route('/service/serviceList/')
    .post(postController.get_serviceList);
postRouter.route('/department/departmentList/')
    .post(postController.get_departmentList);
postRouter.route('/direction/directionList/')
    .post(postController.get_directionList);
postRouter.route('/')
    .get(postController.get_post)
    .put(postController.modify_post)
    .post(postController.add_post)
    .delete(postController.delete_post);
postRouter.route('/service/')
    .get(postController.get_service)
    .post(postController.add_service)
    .delete(postController.delete_service)
    .put(postController.update_service);
postRouter.route('/department/')
    .get(postController.get_department)
    .post(postController.add_department)
    .delete(postController.delete_department)
    .put(postController.update_department);

postRouter.route('/direction/')
    .get(postController.get_direction)
    .post(postController.add_direction)
    .delete(postController.delete_direction)
    .put(postController.update_direction);

module.exports = postRouter;