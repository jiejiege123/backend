var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');// 日志

// 路由
var router = require('./routes/router.js');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var app = express();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// 日志
app.use(logger('dev'));
//解析url编码
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//cookie
app.use(cookieParser());
// 静态资源
// app.use(express.static(path.join(__dirname, 'public')));
// 路由
app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.json('error');
// });

// //配置端口
// app.listen(3000,function(){
// 	console.log('服务器已启动，请访问localhost:3000');
// });

module.exports = app;

