/*
* @Author: ZZZ
* @Date:   2018-04-24 00:04:45
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-01 10:59:56
*/
/* jshint esversion: 6 */ 
const db = require('./../db/dbConfig.js');

const header = {
    login: function (name, psd, cb) {
        let sql ="select * from user where name = '" + name + "' and psd = '" + psd + "'";
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
    profile: function (params, cb) {
        // let sql ="update * from user where id = '" + params.id + "' and psd = '" + psd + "'";
        let sql =`update user set id = ? , userName = ?, email = ?, headPhoto = ? where id = params.id`;
        //db.config.host = 'localhost';
        db.connection(sql, [params.id, params.userName, params.email, params.headPhoto], cb);
    },
    getInfo: function (params, cb) {
        // let sql ="update * from user where id = '" + params.id + "' and psd = '" + psd + "'";
        let sql =`select * from user where id = ?`;
        //db.config.host = 'localhost';
        db.connection(sql, [params], cb);
    },

};
module.exports = header;