//
// https://www.airpair.com/javascript/complete-expressjs-nodejs-mongodb-crud-skeleton
// https://webdesign.tutsplus.com/tutorials/baking-bootstrap-snippets-with-jade--cms-22798
//

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// ** Added MongoDB Connection model

var db = require('./model/db');

// ** Added new application
var blob = require('./model/blobs');

var index = require('./routes/index');

// ** Added new route
var blobs = require('./routes/blobs');

var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
// ** Added Application
app.use('/blobs', blobs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Path does not exist.');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
