/**
 * Created by user on 12/28/2016.
 */
var express = require('express');
var userRouter = express.Router();
var userController = require('../controllers/user');

// Handle user processes
userRouter.route('/image')
    .post(userController.setImage)
    .delete(userController.clearImage);

userRouter.route("/users_in_services/").post(userController.get_users_in_services);
userRouter.route("/users_in_planned_training/").post(userController.get_users_in_planned_training);

userRouter.route('/userList')
    .post(userController.get_userList);

userRouter.route('/')
    .get(userController.get_user)
    .post(userController.add_user)
    .delete(userController.delete_user)
    .put(userController.update_user);

module.exports = userRouter;