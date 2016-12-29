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
var quizRouter = require('./routes/quiz');
var trainingRouter = require('./routes/rTraining');
var userRouter = require('./routes/user');
var subsRouter = require('./routes/subs');
var postRouter = require('./routes/post');
var resourceRouter = require('./routes/resource');
var trainingLocationRouter = require('./routes/trainingLocation');
var managementRouter = require('./routes/management');
var userLocationRouter = require('./routes/userLocation');
var exTrainerRouter = require('./routes/exTrainer');
var userPostRouter = require('./routes/userPost');

var authController = require('./controllers/auth');

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

// Create endpoint handler for /login
loginRouter.route('/')
    .post(authController.authenticate);

// Create endpoint handler for /logout
logoutRouter.route('/')
    .get(authController.deAuthenticate);

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
                                subtitle: "Training Management",
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
                          subtitle: "Training Management",
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
app.set('env', 'production')
console.log(app.get('env'));

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

// production error handler. No stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Start the server
app.listen(8080, function() {
  console.log('Express server listening on port 8080');
});
