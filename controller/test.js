/*
* @Author: ZZZ
* @Date:   2018-05-10 14:55:03
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-19 10:15:51
*/
/* jshint esversion: 6 */
const model = require('../model/model.js');
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
};

module.exports = project;