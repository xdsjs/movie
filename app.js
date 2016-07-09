var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var session = require('express-session')
// var logger = require('express-logger')
var mongoStore = require('connect-mongo')(session)
var Movie = require('./app/models/movie')

var app = express();

var dbUrl = 'mongodb://localhost/imooc'

mongoose.connect(dbUrl)

// view engine setup
app.set('views', path.join(__dirname, 'app/views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// 可以将表单中的数据进行格式化
app.use(bodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'imooc',
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}))

// 针对开发环境配置调试的信息设置
if ('development' === app.get('env')) {
  app.set('showStackError', true)
  // app.use(logger({path: '/home/sjs/documents/fontTrip/AtomWorkSpace/movie/log/log.txt'}))
  app.locals.pretty = true // 将网页源代码格式化后显示
  mongoose.set('debug', true)
}

app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment')

// 路由
require('./routes/routes')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


module.exports = app;
