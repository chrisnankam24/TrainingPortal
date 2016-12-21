/**
 * author: chrisnankam24
 * copyright Orange CM, 2016
 */

// Required Packages
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var routes = require('./routes/index');

var authController = require('./controllers/auth');
var userController = require('./controllers/user');
var managementController = require('./controllers/management');
var trainingController = require('./controllers/training');
var trainingLocationController = require('./controllers/training_location');
var userLocationController = require('./controllers/user_location');
var userPostController = require('./controllers/user_post');
var exTrainerController = require('./controllers/ex_trainers');
var subsController = require('./controllers/subsidiaries');
var quizController = require('./controllers/quiz');
var postController = require('./controllers/post');
var resourceController = require('./controllers/resource');

var userModel = require('./models/user'); // For user info
var config = require('./config/config'); // get our config file
var db = require('./config/database'); // get our config file

// Create our Express application
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sessionStore = new MySQLStore({}/* session store options */, db.connection);

app.use(session(
    {
        secret: config.JWT_SECRET,
        store: sessionStore,
        resave: true,
        saveUninitialized: true
    }
    )
);


app.use('/', routes);

// Create our Login router
var loginRouter = express.Router();

// Create our Logout router
var logoutRouter = express.Router();

// Create our user router
var userRouter = express.Router();

// Create training router
var trainingRouter = express.Router();

var trainingLocationRouter = express.Router();

var userLocationRouter = express.Router();

var userPostRouter = express.Router();

var exTrainerRouter = express.Router();

var subsRouter = express.Router();

var postRouter = express.Router();

// Create quiz router
var quizRouter = express.Router();

// Create resource router
var resourceRouter = express.Router();

// Create management router
var managementRouter = express.Router();

// Create endpoint handler for /login
loginRouter.route('/')
    .post(authController.authenticate);

// Create endpoint handler for /logout
logoutRouter.route('/')
    .get(authController.deAuthenticate);

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

trainingRouter.route('/trainingList')
    .post(trainingController.get_trainingList);
trainingRouter.route('/hideTraining')
    .post(trainingController.hideTraining);
trainingRouter.route('/dailyTrainingList')
    .post(trainingController.get_dayilyTrainingList);
trainingRouter.route('/subsTrainingList')
    .post(trainingController.get_subsTrainingList);
trainingRouter.route('/subsQuizList')
    .post(trainingController.get_subsQuizList);
trainingRouter.route('/adminTrainingList')
    .post(trainingController.get_adminTrainingList);
trainingRouter.route('/yearlyTrainingProgram')
    .post(trainingController.get_yearlyTrainingProgram);
trainingRouter.route('/subsYearlyTrainingProgram')
    .post(trainingController.get_subsYearlyTrainingProgram);
trainingRouter.route('/trainingInfo')
    .post(trainingController.get_sessionTrainingInfo);
trainingRouter.route('/trainingExtTrainers')
    .post(trainingController.get_training_ext_trainers);
trainingRouter.route('/trainingIntTrainers')
    .post(trainingController.get_training_int_trainers);
trainingRouter.route('/trainingResources')
    .post(trainingController.get_training_resources);
trainingRouter.route('/registerTraining')
    .post(trainingController.register_training);
trainingRouter.route('/trainingQuiz')
    .post(trainingController.get_training_quiz);
trainingRouter.route('/trainingForm')
    .post(trainingController.training_form);
trainingRouter.route('/trainingEvaluated')
    .post(trainingController.has_evaluated);
trainingRouter.route('/trainingEvaluation')
    .post(trainingController.user_training_evaluation);

trainingRouter.route('/PTraining')
    .post(trainingController.set_pt_training);

trainingRouter.route('/sessions')
    .get(trainingController.get_pt_sessions);

trainingRouter.route('/session_participants')
    .get(trainingController.get_session_participants);

trainingRouter.route('/session_taking')
    .post(trainingController.session_taking);

trainingRouter.route('/notify')
    .post(trainingController.notify);

trainingRouter.route('/PTrainingList')
    .post(trainingController.get_ptList);

trainingRouter.route('/trainersList')
    .get(trainingController.get_all_trainers);

trainingRouter.route('/')
    .get(trainingController.get_training)
    .post(trainingController.add_training)
    .delete(trainingController.delete_training)
    .put(trainingController.update_training);

trainingRouter.route('/usersTrainingKPI')
    .post(trainingController.get_usersTrainingKPI);

trainingRouter.route('/trainingKPI')
    .post(trainingController.get_trainingKPI);

trainingRouter.route('/pt/')
    .get(trainingController.get_planned_training)
    .delete(trainingController.delete_planned_training);
trainingRouter.route('/eval_report/')
    .get(trainingController.get_training_report);

trainingLocationRouter.route('/trainingLocationList')
    .post(trainingLocationController.get_trainingLocationList);

trainingLocationRouter.route('/')
    .get(trainingLocationController.get_trainingLocation)
    .post(trainingLocationController.add_trainingLocation)
    .delete(trainingLocationController.delete_trainingLocation)
    .put(trainingLocationController.update_trainingLocation);

userLocationRouter.route('/userLocationList')
    .post(userLocationController.get_userLocationList);

userLocationRouter.route('/')
    .get(userLocationController.get_userLocation)
    .post(userLocationController.add_userLocation)
    .delete(userLocationController.delete_userLocation)
    .put(userLocationController.update_userLocation);

userPostRouter.route('/userPostList')
    .post(userPostController.get_userPostList);

userPostRouter.route('/')
    .get(userPostController.get_userPost)
    .post(userPostController.add_userPost);

exTrainerRouter.route('/exTrainerList')
    .post(exTrainerController.get_exTrainerList);

exTrainerRouter.route('/')
    .get(exTrainerController.get_exTrainer)
    .post(exTrainerController.add_exTrainer)
    .delete(exTrainerController.delete_exTrainer)
    .put(exTrainerController.update_exTrainer);

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

postRouter.route('/postList/')
    .post(postController.get_postList);
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

resourceRouter.route('/resourceList')
    .post(resourceController.get_resourceList);

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

managementRouter.route('/subsList')
    .post(managementController.get_subsList);
managementRouter.route('/subsDetails')
    .post(managementController.get_subs_details);

app.use('/api/v1/login', loginRouter);
app.use('/api/v1/logout', logoutRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/training', trainingRouter);
app.use('/api/v1/subs', subsRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/quiz', quizRouter);
app.use('/api/v1/resource', resourceRouter);
app.use('/api/v1/trainingLocation', trainingLocationRouter);
app.use('/api/v1/userLocation', userLocationRouter);
app.use('/api/v1/userPost', userPostRouter);
app.use('/api/v1/externalTrainer', exTrainerRouter);
app.use('/api/v1/management', managementRouter);

//////////////////////////////////////////////////////////
app.get('/login', function (req, res) {
  res.render('login', {title: 'DV Portal | Login'});
});

app.get('/tmp', authController.isAuthenticated, function (req, res) {

    req.session.data = req.decoded;

    // Get user status
    if(req.session.data.status == "TRAINER"){
        res.redirect('/trainer');
    }else {
        res.redirect('/trainee');
    }

});

/**
 * Destroy client session data and redirect client
 */
app.get('/tmpDestroy', function (req, res) {

    req.session.destroy(function(err) {
        if(err) {

        } else {

        }
        res.redirect('/login');
    });
});

app.get('/trainer', function (req, res) {

    if(req.session.data){

        if(req.session.data.status == 'TRAINER'){
            userModel.get_user_view_info(req.session.data.cuid, function (err, rows) {

                var params = {};

                if(err){

                    params = {
                        title: 'DV Portal | Administration',
                        params: {
                            header : {
                                title: "Portal",
                                subtitle: "Sales Training",
                                menu: {
                                    administration: "Administration"
                                }
                            },
                            is_manager: req.session.data.status == 'MANAGER',
                            is_trainer: req.session.data.status == 'TRAINER',
                            user: {
                                full_name: req.session.data.firstName + ' ' + req.session.data.lastName,
                                direction: "----",
                                image:  req.session.data.image != 'none' ? req.session.data.image : req.session.data.gender == 1 ? "/images/user_images/male.png" : "/images/user_images/female.png"

                            }
                        }
                    };

                }else{

                    params = {
                        title: 'DV Portal | Administration',
                        params: {
                            header : {
                                title: "Portal",
                                subtitle: "Sales Training",
                                menu: {
                                    administration: "Administration"
                                }
                            },
                            is_manager: req.session.data.status == 'MANAGER',
                            is_trainer: req.session.data.status == 'TRAINER',
                            user: {
                                full_name: req.session.data.firstName + ' ' + req.session.data.lastName,
                                direction: rows[0].direction.substr(0, 12),
                                image: rows[0].usr_img != 'none' ? rows[0].usr_img : req.session.data.gender == 1 ? "/images/user_images/male.png" : "/images/user_images/female.png"


                            }
                        }
                    };
                }

                res.render('trainer', params);

            });
        }else{
            res.redirect('/trainee');
        }
    }else{
        res.redirect('/login');
    }

});

app.get('/trainee', function (req, res) {
  if(req.session.data){

      userModel.get_user_view_info(req.session.data.cuid, function (err, rows) {

          var params = {};

          if(err){

              params = {
                  title: req.session.data.status == 'MANAGER' ? 'DV Portal | Manager' : 'DV Portal | Trainee',
                  params: {
                      header : {
                          title: "Portal",
                          subtitle: "Sales Training",
                          menu: {
                              training: "Training",
                              quiz: "Quiz",
                              resources: "Resources",
                              management: "Subordinates"
                          }
                      },
                      is_manager: req.session.data.status == 'MANAGER',
                      is_trainer: req.session.data.status == 'TRAINER',
                      user: {
                          full_name: req.session.data.firstName + ' ' + req.session.data.lastName,
                          direction: "----",
                          image:  req.session.data.image != 'none' ? req.session.data.image : req.session.data.gender == 1 ? "/images/user_images/male.png" : "/images/user_images/female.png"

                      }
                  }
              };

          }else{

              params = {
                  title: req.session.data.status == 'MANAGER' ? 'DV Portal | Manager' : 'DV Portal | Trainee',
                  params: {
                      header : {
                          title: "Portal",
                          subtitle: "Sales Training",
                          menu: {
                              training: "Training",
                              quiz: "Quiz",
                              resources: "Resources",
                              management: "Subordinates"
                          }
                      },
                      is_manager: req.session.data.status == 'MANAGER',
                      is_trainer: req.session.data.status == 'TRAINER',
                      user: {
                          full_name: req.session.data.firstName + ' ' + req.session.data.lastName,
                          direction: rows[0].direction.substr(0, 12),
                          image: rows[0].usr_img != 'none' ? rows[0].usr_img : req.session.data.gender == 1 ? "/images/user_images/male.png" : "/images/user_images/female.png"


                      }
                  }
              };
          }

          console.log(params);

          res.render('trainee', params);
      });
  }else{
      res.redirect('/login');
  }
});

app.get('/test', function (req, res) {
    res.render('test', {title: 'DV Portal | Test'});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //var err = new Error('Not Found');
  //err.status = 404;
  //next(err);
    res.redirect('/trainee');

});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Start the server
app.listen(3000, function() {
  console.log('Express server listening on port 3000');
});
