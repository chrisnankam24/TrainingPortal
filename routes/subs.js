/**
 * Created by user on 12/28/2016.
 */
var express = require('express');
var subsRouter = express.Router();
var subsController = require('../controllers/subsidiaries');

subsRouter.route('/sub_cat/')
    .get(subsController.get_sub_category)
    .post(subsController.add_sub_category)
    .delete(subsController.delete_sub_category)
    .put(subsController.update_sub_category);

subsRouter.route('/trans_mode/')
    .get(subsController.get_trans_mode)
    .post(subsController.add_trans_mode)
    .delete(subsController.delete_trans_mode)
    .put(subsController.update_trans_mode);

subsRouter.route('/training_type/')
    .get(subsController.get_training_type)
    .post(subsController.add_training_type)
    .delete(subsController.delete_training_type)
    .put(subsController.update_training_type);

subsRouter.route('/training_aud/')
    .get(subsController.get_training_aud)
    .post(subsController.add_training_aud)
    .delete(subsController.delete_training_aud)
    .put(subsController.update_training_aud);

subsRouter.route('/training_loc/')
    .get(subsController.get_training_loc)
    .post(subsController.add_training_loc)
    .delete(subsController.delete_training_loc)
    .put(subsController.update_training_loc);

subsRouter.route('/eval_form/')
    .get(subsController.get_eval_form)
    .post(subsController.add_eval_form)
    .delete(subsController.delete_eval_form)
    .put(subsController.update_eval_form);

module.exports = subsRouter;