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
        let sql =`update user set userName = '${params.userName || ''}', email = '${params.email || ''}', headPhoto = '${params.headPhoto || ''}', sitName = '${params.sitName || ''}', sitHttp = '${params.sitHttp || ''}',sitDis = '${params.sitDis || ''}',sitKeys = '${params.sitKeys || ''}' where id = ${params.id}`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
    getInfo: function (params, cb) {
        // let sql ="update * from user where id = '" + params.id + "' and psd = '" + psd + "'";
        let sql =`select * from user where id = ?`;
        //db.config.host = 'localhost';
        db.connection(sql, [params], cb);
    },
    getArticle: function (cb) {
        // let sql ="update * from user where id = '" + params.id + "' and psd = '" + psd + "'";
        let sql =`select * from article where id = 1`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },

    // 分类
    getCategories: function (page, pageSize, keywords, cb) {
        let start = (page - 1) * pageSize
        let sql =`select * from categories where cagName like '%${keywords}%' limit ${start}, ${pageSize};select count(*) as totle from categories where id > 0`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
    getCategoriesAll: function ( cb) {
        let sql =`select id, cagName from categories`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
    addCategories: function (params,cb) {
        let sql =`insert into categories(cagName,pid,eName,decs,upIndex) value(?,?,?,?,?)`;
        db.connection(sql, [params.cagName, params.pid, params.eName, params.decs, params.upIndex ], cb);
    },
    updateCategories: function (params,cb) {
        let sql =`update categories set cagName = ?, pid = ?, eName = ?, decs = ?, upIndex = ? where id = ${params.id}`;
        //db.config.host = 'localhost';
        db.connection(sql, [params.cagName,params.pid, params.eName,params.decs ,params.upIndex], cb);
    },
    delCategories: function (params,cb) {
        let sql =`delete from categories where id in (${params.id})`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },

    // 标签
    getTags: function (page, pageSize, keywords, cb) {
        let start = (page - 1) * pageSize
        let sql =`select * from tags where tagName like '%${keywords}%' limit ${start}, ${pageSize};select count(*) as totle from tags where id > 0`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
    addTags: function (params,cb) {
        let sql =`insert into tags(tagName,eName,decs) value(?,?,?)`;
        db.connection(sql, [params.tagName, params.eName, params.decs, ], cb);
    },
    updateTags: function (params,cb) {
        let sql =`update tags set tagName = ?, eName = ?, decs = ? where id = ${params.id}`;
        //db.config.host = 'localhost';
        db.connection(sql, [params.tagName, params.eName, params.decs], cb);
    },
    delTags: function (params,cb) {
        let sql =`delete from tags where id in (${params.id})`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },

    // 文章
    getArticleList: function (page, pageSize, keywords, tags, categories, cb) {
        let start = (page - 1) * pageSize
        let sql =`select * from article where title like '%${keywords}%' and tags like '%${tags}%' and categories like '%${categories}%' limit ${start}, ${pageSize};select count(*) as totle from tags where id > 0`;
        //db.config.host = 'localhost';
        console.log(sql)
        db.connection(sql, [], cb);
    },
    addArticle: function (params,cb) {
        let sql =`insert into article(title,eName,decs) value(?,?,?)`;
        db.connection(sql, [params.title, params.eName, params.decs, ], cb);
    },
    updateArticle: function (params,cb) {
        let sql =`update article set title = ?, eName = ?, decs = ? where id = ${params.id}`;
        //db.config.host = 'localhost';
        db.connection(sql, [params.title, params.eName, params.decs], cb);
    },
    delArticle: function (params,cb) {
        let sql =`delete from article where id in (${params.id})`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
};
module.exports = header;