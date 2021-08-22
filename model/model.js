/*
* @Author: ZZZ
* @Date:   2018-04-24 00:04:45
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-01 10:59:56
*/
/* jshint esversion: 6 */ 
const db = require('./../db/dbConfig.js');
const parseTime = require('./../utils/index.js')
const header = {
    login: function (name, psd, cb) {
        let sql ="select * from user where name = '" + name + "' and psd = '" + psd + "'";
        db.connection(sql, [], cb);
    },
    profile: function (params, cb) {
        // let sql ="update * from user where id = '" + params.id + "' and psd = '" + psd + "'";
        let sql =`update user set userName = '${params.userName || ''}', email = '${params.email || ''}', headPhoto = '${params.headPhoto || ''}', sitName = '${params.sitName || ''}', sitHttp = '${params.sitHttp || ''}',sitDis = '${params.sitDis || ''}',sitKeys = '${params.sitKeys || ''}', homePage = '${params.homePage || ''}' where id = ${params.id}`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
    getInfo: function (params, cb) {
        let sql =`select * from user where id = ?`;
        db.connection(sql, [params], cb);
    },
    getArticle: function (id,click,type,cb) {
        let sql
        if (click) {
            sql =`select * from ${type} where id = ${id}; update ${type} set visits = visits + 1 where id = ${id}`
        } else {
            sql =`select * from article where id = ${id}`
        }
        db.connection(sql, [], cb);
    },

    // 分类
    getCategories: function (page, pageSize, keywords, cb) {
        let start = (page - 1) * pageSize
        let sql =`select * from categories where cagName like '%${keywords}%' limit ${start}, ${pageSize};select count(*) as total from categories where id > 0 and cagName like '%${keywords}%'`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
    getCategoriesAll: function ( cb) {
        let sql =`select id, cagName, pid, icon, eName from categories`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
    addCategories: function (params,cb) {
        let sql =`insert into categories(cagName,pid,eName,decs,upIndex,icon) value(?,?,?,?,?,?)`;
        db.connection(sql, [params.cagName, params.pid, params.eName, params.decs, params.upIndex, params.icon ], cb);
    },
    updateCategories: function (params,cb) {
        let sql =`update categories set cagName = ?, pid = ?, eName = ?, decs = ?, upIndex = ?,  icon = ? where id = ${params.id}`;
        //db.config.host = 'localhost';
        db.connection(sql, [params.cagName,params.pid, params.eName,params.decs ,params.upIndex, params.icon], cb);
    },
    delCategories: function (params,cb) {
        let sql =`delete from categories where id in (${params.id})`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },

    // 标签
    getTags: function (page, pageSize, keywords, cb) {
        let start = (page - 1) * pageSize
        let sql =`select * from tags where tagName like '%${keywords}%' limit ${start}, ${pageSize};select count(*) as total from tags where id > 0 and tagName like '%${keywords}%'`;
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
        // 当前时间
        let time = parseTime(new Date().getTime())
        let sql =`select id, author, creatTime, updateTime, categories,tags,status,commentNums,title, abstract from article where (title like '%${keywords}%' or body like '%${keywords}%') and tags like '%${tags}%' and categories like '%${categories}%' and updateTime < '${time}' order by creatTime DESC limit ${start}, ${pageSize}; select count(*) as total from article where id > 0 and title like '%${keywords}%' and tags like '%${tags}%' and categories like '%${categories}%'`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
    addArticle: function (params,cb) {
        let abstract
        if (params.body.length > 130) {
            abstract = params.body.slice(0, 130).replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ')+'...'
        } else {
            abstract = params.body.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ')
        }
        let sql =`insert into article(author,title,body,creatTime,updateTime, tags, categories, md, abstract) value(?,?,?,?,?,?,?,?,?);update time set activeTime = '${new Date().getTime()}'`;
        db.connection(sql, [params.author,params.title, params.body, params.creatTime,params.updateTime, params.tags, params.categories, params.md, abstract], cb);
    },
    updateArticle: function (params,cb) {
        let abstract
        if (params.body.length > 130) {
            abstract = params.body.slice(0, 130).replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ')+'...'
        } else {
            abstract = params.body.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ')
        }
        let sql =`update article set title=?, body=?,updateTime=?, tags=?, categories=?, md=?, abstract=? where id = ${params.id};update time set activeTime = '${new Date().getTime()}'`;
        //db.config.host = 'localhost';
        db.connection(sql, [params.title, params.body, params.updateTime, params.tags, params.categories, params.md, abstract], cb);
    },
    delArticle: function (params,cb) {
        let sql =`delete from article where id in (${params.id});update time set activeTime = '${new Date().getTime()}'`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },

    // 页面
    getPagesList: function (page, pageSize, keywords, cb) {
        let start = (page - 1) * pageSize
        let sql =`select id, creatTime, updateTime, commentNums,title,upIndex,eName,icon from pages where title like '%${keywords}%' limit ${start}, ${pageSize};select count(*) as total from pages where id > 0 and title like '%${keywords}%'`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
    getPage: function (id,cb) {
        // let sql ="update * from user where id = '" + params.id + "' and psd = '" + psd + "'";
        let sql =`select * from pages where id = ${id}`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
    addPages: function (params,cb) {
        let sql =`insert into pages(title,body,creatTime,updateTime, upIndex, md, eName, icon) value(?,?,?,?,?,?,?,?);update time set activeTime = '${new Date().getTime()}'`;
        db.connection(sql, [params.title, params.body, params.creatTime,params.updateTime, params.upIndex, params.md, params.eName, params.icon], cb);
    },
    updatePages: function (params,cb) {
        let sql =`update pages set title=?, body=?,updateTime=?, upIndex=?, md=?, eName=?, icon=? where id = ${params.id};update time set activeTime = '${new Date().getTime()}'`;
        //db.config.host = 'localhost';
        db.connection(sql, [params.title, params.body, params.updateTime, params.upIndex, params.md, params.eName, params.icon], cb);
    },
    delPages: function (params,cb) {
        let sql =`delete from pages where id in (${params.id});update time set activeTime = '${new Date().getTime()}'`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },

    // 动态
    getThumbsList: function (page, pageSize, keywords, cb) {
        let start = (page - 1) * pageSize
        let sql =`select id, body, userId, userName, creatTime from thumb where body like '%${keywords}%' order by creatTime DESC limit ${start}, ${pageSize}; select count(*) as total from thumb where id > 0 and body like '%${keywords}%'`;
        db.connection(sql, [], cb);
    },
    addThumb: function (params,cb) {
        let sql =`insert into thumb(body, userId, userName, creatTime) value(?,?,?,?);update time set activeTime = '${new Date().getTime()}'`;
        db.connection(sql, [params.body,params.userId, params.userName, params.creatTime], cb);
    },
    updateThumb: function (params,cb) {
        let sql =`update thumb set body=? where id = ${params.id};update time set activeTime = '${new Date().getTime()}'`;
        //db.config.host = 'localhost';
        db.connection(sql, [params.body], cb);
    },
    delThumb: function (params,cb) {
        let sql =`delete from thumb where id in (${params.id});update time set activeTime = '${new Date().getTime()}'`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },

    getRouter: function (cb) {
        let sql =`select id,title,eName,upIndex,icon from pages;select * from categories`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
    getArticleOrder: function (cb) {
        let sql =`select id, author, creatTime, updateTime, categories,tags,status,commentNums,title,visits, abstract from article order by visits DESC limit 0,10; select id, author, creatTime, updateTime, categories,tags,status,commentNums,title,visits,abstract from article order by updateTime DESC limit 0,10;select count(*) as total from article where id > 0;select * from time`;
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
};
module.exports = header;