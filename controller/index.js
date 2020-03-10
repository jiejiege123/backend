/*
* @Author: ZZZ
* @Date:   2018-05-10 14:55:03
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-19 10:15:51
*/
/* jshint esversion: 6 */
const model = require('../model/model.js');
var md5=require('md5-node');

// const path=require('path');
// const fs=require('fs');
const project = {
    //get 接口
    getTest:function (req,res) {
        // console.log(req.body)
        // console.log(req.query)
        // console.log(req.params)
        console.log(req.param('id'))  // 参数写法 卧槽 相当的死啊
        function cb(err, data) {
            console.log(data)
            if (err == null) {
                let mydata = {data:data};
                //console.log(mydata);
                res.send(mydata);
            }
        }
        model.drop_down(req.param('id'), cb);
    },
    getTestPost:function (req,res) {
        console.log(req.body) // POST 可以这样获取
        // console.log(req.param('id'))  // 参数写法 get post 都有效
        function cb(err, data) {
            console.log(data)
            if (err == null) {
                let mydata = {data:data};
                //console.log(mydata);
                res.send(mydata);
            }
        }
        model.drop_down(req.body.id, cb);
    },
    login:function (req,res) {
        // console.log(req.body) // POST 可以这样获取
        let username = req.body.username
        let password = req.body.password
        // console.log(username, password)
        // console.log(req.param('id'))  // 参数写法 get post 都有效
        function cb(err, data) {
            // console.log(err, data)
            if (err == null) {
                let Data = {}
                if (data.length > 0) {
                    Data = {
                        Status: 200,
                        Data: {
                            name: data[0].name,
                            id: data[0].id,
                        },
                        Msg: '登录成功'
                    }
                } else {
                    Data = {
                        Status: 400,
                        Data:'',
                        Msg: '账号或者密码错误'
                    }
                }
                let account = md5(data[0].name) +'-'+ md5(data[0].psd)
                let ssid = md5(md5(data[0].name)) + md5(md5(data[0].psd))
                // 设置cookies
                // res.writeHead(200, {
                //     'Set-Cookie': ['ssid = ' + ssid, 'account = ' + account] // cookie名=cookie值
                // });
                res.cookie('account', account)
                res.cookie('ssid', ssid)
                //console.log(mydata);
                res.send(Data);
            }
        }
        model.login(username, password, cb);
    },
    profile: function (req, res) {
        console.log(req.body) // POST 可以这样获取
        // console.log(req.param('id'))  // 参数写法 get post 都有效
        function cb(err, data) {
            console.log(data)
            if (err == null) {
                //console.log(mydata);
                let mydata = {
                    Status: 200,
                    Data: '',
                    Msg: '编辑成功'
                }
                res.send(mydata);
            }
        }
        model.profile(req.body, cb);
    },
    getInfo:function (req,res) {
        // console.log(req.body) // POST 可以这样获取
        let username = req.body.username
        let password = req.body.password
        // console.log(username, password)
        // console.log(req.param('id'))  // 参数写法 get post 都有效
        function cb(err, data) {
            // console.log(err, data)
            if (err == null) {
                let Data = {}
                if (data.length > 0) {
                    Data = {
                        Status: 200,
                        Data:{
                            id: data[0].id,
                            name: data[0].name,
                            sitName: data[0].sitName,
                            sitHttp: data[0].sitHttp,
                            sitDis: data[0].sitDis,
                            sitKeys: data[0].sitKeys,
                            userName: data[0].userName,
                            headPhoto: data[0].headPhoto,
                            email: data[0].email,
                            homePage: data[0].homePage
                        },
                        Msg: '获取成功'
                    }
                } else {
                    Data = {
                        Status: 400,
                        Data:null,
                        Msg: '信息获取失败'
                    }
                }
                //console.log(mydata);
                res.send(Data);
            }
        }
        model.getInfo(req.param('id'), cb);
    },
};

module.exports = project;