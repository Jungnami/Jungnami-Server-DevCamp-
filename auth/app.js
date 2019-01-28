var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var passport = require('passport') //passport module add
  , LocalStrategy = require('passport-local').Strategy;
  const passportConfig = require('./config/passport'); 

var indexRouter = require('./routes/index');

var app = express();


var router = require('./routes/main')(app);
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/passport')(passport);
app.use(session({ secret: 'secret', resave: true, saveUninitialized: false })); 
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결

app.use(helmet());
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
