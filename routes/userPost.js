/**
 * Created by user on 12/28/2016.
 */
var express = require('express');
var userPostRouter = express.Router();
var userPostController = require('../controllers/user_post');

userPostRouter.route('/userPostList')
    .post(userPostController.get_userPostList);

userPostRouter.route('/')
    .get(userPostController.get_userPost)
    .post(userPostController.add_userPost);

module.exports = userPostRouter;