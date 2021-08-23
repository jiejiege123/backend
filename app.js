/*
 * @Author: your name
 * @Date: 2020-03-11 08:29:17
 * @LastEditTime: 2021-08-23 08:57:22
 * @LastEditors: zzz
 * @Description: In User Settings Edit
 * @FilePath: \backend\app.js
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');// 日志
var md5=require('md5-node');
// 路由
var router = require('./routes/router.js');
var uploadImg = require('./routes/img.js');
var bodyParser = require('body-parser');
var compression = require('compression') // gzip

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var app = express();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(compression()); // gzip

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
// 日志
app.use(logger('dev'));
//解析url编码
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//cookie
app.use(cookieParser());
// 静态资源
app.use(express.static(path.join(__dirname, 'public')));
let activeTime
// 登录拦截 判断登录 
// 思路 先判断cookies中是否有account 和 ssid 没有的话 肯定就是登录 找到用户名和密码
// 加密保存到ssid 然后加密account
app.all('*', function(req, res, next) {
  if (req.headers.origin) {
    let allowHttp = [
      'http://localhost:9510'
    ]
    if (allowHttp.includes(req.headers.origin.toLowerCase())) {
      res.header('Access-Control-Allow-Origin',req.headers.origin)
    }
    res.header('Access-Control-Allow-Credentials',true)
    res.header('Access-Control-Allow-Headers','x-requested-with,content-type')
    res.header('Content-Security-Policy','upgrade-insecure-requests')
  }
  next()
})
app.use('/backend', function(req, res, next) {

  let Cookies = req.cookies
  let flag = true
  if (Cookies.account) {
    let cok = Cookies.account.split('-')
    let name = md5(cok[0])
    let psd = md5(cok[1])
    name + psd === Cookies.ssid ? flag = true : flag = false
  } else {
    flag = false
  }
  if (flag) {
    next()
  } else {
    res.send({
      Status: 400,
      Msg: '请先登录'
    });
  }
})

// 路由
app.use(uploadImg);
app.use(router);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // app.use('/', indexRouter);
// // app.use('/users', usersRouter);

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send('error');
// });

//配置端口
// app.listen(3000,function(){
// 	console.log('服务器已启动，请访问localhost:3000');
// });

module.exports = app