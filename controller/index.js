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
                        Data:data[0].name,
                        Msg: '登录成功'
                    }
                } else {
                    Data = {
                        Status: 400,
                        Data:null,
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
};

module.exports = project;