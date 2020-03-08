/*
* @Author: ZZZ
* @Date:   2018-04-24 00:04:45
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-01 10:59:56
*/
/* jshint esversion: 6 */ 
const db = require('./../db/dbConfig.js');

const header = {
    // flowerParsBL:function (Id,cb) {
    //     var sql;
    //     if (Id == 1 || Id == 2 || Id == 3 || Id == 4) {
    //         sql = 'select * from fdetimg WHERE f_id=? ';
    //     }else{
    //         sql = 'select f_msg from flowers WHERE f_id=?'
    //     }
    //     db.connection(sql,param,cb);  param: [Id] 数组代表sql中?的值
    // },
    drop_down: function (id, cb) {
        let sql = 'SELECT * FROM diclist WHERE id=?';
        //db.config.host = 'localhost';
        db.connection(sql, [id], cb);
    },
    login: function (name, psd, cb) {
        let sql ="select * from user where name = '" + name + "' and psd = '" + psd + "'";
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
};
module.exports = header;