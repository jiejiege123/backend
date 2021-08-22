/*
* @Author: ZZZ
* @Date:   2018-05-10 14:55:03
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-19 10:15:51
*/
/* jshint esversion: 6 */
const model = require('../model/model.js');
var md5=require('md5-node');
const project = {
    //get 接口
    getTest:function (req,res) {
        console.log(req.param('id'))  // 参数写法 卧槽 相当的死啊
        function cb(err, data) {
            if (err == null) {
                let mydata = {data:data};
                res.send(mydata);
            }
        }
        model.drop_down(req.param('id'), cb);
    },
    getTestPost:function (req,res) {
        console.log(req.body) 
        function cb(err, data) {
            if (err == null) {
                let mydata = {data:data};
                res.send(mydata);
            }
        }
        model.drop_down(req.body.id, cb);
    },
    login:function (req,res) {
        let username = req.body.username
        let password = req.body.password
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
                    let account = md5(data[0].name) +'-'+ md5(data[0].psd)
                    let ssid = md5(md5(data[0].name)) + md5(md5(data[0].psd))

                    res.cookie('account', account)
                    res.cookie('ssid', ssid)
                } else {
                    Data = {
                        Status: 400,
                        Data:'',
                        Msg: '账号或者密码错误'
                    }
                }
                res.send(Data);
            } else {
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '登录失败, 请检查后台'
                });
            }
        }
        model.login(username, password, cb);
    },
    profile: function (req, res) {
        console.log('req.body',req.body) 
        function cb(err, data) {
            console.log('data',data)
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: '',
                    Msg: '编辑成功'
                }
                res.send(mydata);
            } else {
                console.log(err)
                let mydata = {
                    Status: 400,
                    Data: '',
                    Msg: '编辑失败'
                }
                res.send(mydata);
            }
        }
        model.profile(req.body, cb);
    },
    getInfo:function (req,res) {
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
                res.send(Data);
            } else {
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '信息获取失败'
                });
            }
        }
        model.getInfo(req.param('id'), cb);
    },
    getArticle: function (req, res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data[0][0] ? data[0][0] : data[0],
                    Msg: '成功'
                }
                res.send(mydata);
            } else {
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '信息获取失败'
                });
            }
        }
        model.getArticle( req.param('id'), req.param('click'), req.param('type'), cb);
    },
    getCategories: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: {
                        data: data[0],
                        total: data[1][0].total
                    },
                    Msg: '成功'
                }
                res.send(mydata);
            } else {
                console.log(err)
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据获取失败'
                })
            }
        }
        let page = parseInt(req.param('page'))
        let pageSize = parseInt(req.param('pageSize'))
        let keywords = req.param('keyword')
        model.getCategories(page,pageSize,keywords, cb);
    },
    getCategoriesAll:function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: {
                        data: data,
                    },
                    Msg: '成功'
                }
                res.send(mydata);
            } else {
                console.log(err)
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据获取失败'
                })
            }
        }
        model.getCategoriesAll(cb);
    },
    addCategories: function (req,res) {

        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '添加成功'
                }
                res.send(mydata);
            } else {
                console.log(err)

                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据添加失败'
                })
            }
        }
        model.addCategories(req.body, cb);
    },
    updateCategories: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '修改成功'
                }
                res.send(mydata);
            } else {
                console.log(err)
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据修改失败'
                })
            }
        }
        model.updateCategories(req.body, cb);
    },
    delCategories: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '删除成功'
                }
                res.send(mydata);
            } else {
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据删除失败'
                })
            }
        }
        model.delCategories(req.body, cb);
    },
    // 标签
    getTags: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: {
                        data: data[0],
                        total: data[1][0].total
                    },
                    Msg: '成功'
                }
                res.send(mydata);
                // model.getTagsRows(cbrow)
            } else {
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据获取失败'
                })
            }
        }
        let page = parseInt(req.param('page'))
        let pageSize = parseInt(req.param('pageSize'))
        let keywords = req.param('keyword')
        model.getTags(page,pageSize,keywords, cb);
    },
    addTags: function (req,res) {

        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '添加成功'
                }
                res.send(mydata);
            } else {
                console.log(err)

                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据添加失败'
                })
            }
        }
        model.addTags(req.body, cb);
    },
    updateTags: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '修改成功'
                }
                res.send(mydata);
            } else {
                console.log(err)
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据修改失败'
                })
            }
        }
        model.updateTags(req.body, cb);
    },
    delTags: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '删除成功'
                }
                res.send(mydata);
            } else {
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据删除失败'
                })
            }
        }
        model.delTags(req.body, cb);
    },

    // 文章列表
    getArticleList: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: {
                        data: data[0],
                        total: data[1][0].total
                    },
                    Msg: '成功'
                }
                res.send(mydata);
            } else {
                console.log(err)
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据获取失败'
                })
            }
        }
        let page = parseInt(req.param('page'))
        let pageSize = parseInt(req.param('pageSize'))
        let tags = req.param('tags')
        let categories = req.param('categories')
        let keywords = req.param('keyword')
        model.getArticleList(page,pageSize,keywords,tags,categories, cb);
    },
    addArticle: function (req,res) {

        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '添加成功'
                }
                res.send(mydata);
            } else {
                console.log(err)

                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据添加失败'
                })
            }
        }
        model.addArticle(req.body, cb);
    },
    updateArticle: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '修改成功'
                }
                res.send(mydata);
            } else {
                console.log(err)
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据修改失败'
                })
            }
        }
        model.updateArticle(req.body, cb);
    },
    delArticle: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '删除成功'
                }
                res.send(mydata);
            } else {
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据删除失败'
                })
            }
        }
        model.delArticle(req.body, cb);
    },

    // 独立页面列表
    getPagesList: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: {
                        data: data[0],
                        total: data[1][0].total
                    },
                    Msg: '成功'
                }
                res.send(mydata);
                // model.getTagsRows(cbrow)
            } else {
                console.log(err)
                res.send({
                    Status: 400,
                    Data:err,
                    Msg: '数据获取失败'
                })
            }
        }
        let page = parseInt(req.param('page'))
        let pageSize = parseInt(req.param('pageSize'))
        let keywords = req.param('keyword')
        model.getPagesList(page,pageSize,keywords, cb);
    },
    getPage: function (req, res) {
        function cb(err, data) {
            if (err == null) {
                //console.log(mydata);
                let mydata = {
                    Status: 200,
                    Data: data[0],
                    Msg: '成功'
                }
                res.send(mydata);
            } else {
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '信息获取失败'
                });
            }
        }
        model.getPage( req.param('id'), cb);
    },
    addPages: function (req,res) {

        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '添加成功'
                }
                res.send(mydata);
            } else {
                console.log(err)

                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据添加失败'
                })
            }
        }
        model.addPages(req.body, cb);
    },
    updatePages: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '修改成功'
                }
                res.send(mydata);
            } else {
                console.log(err)
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据修改失败'
                })
            }
        }
        model.updatePages(req.body, cb);
    },
    delPages: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '删除成功'
                }
                res.send(mydata);
            } else {
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据删除失败'
                })
            }
        }
        model.delPages(req.body, cb);
    },

    // 动态
    getThumbsList: function (req,res) {
        console.log('124')
        function cb(err, data) {
            console.log(err)
            console.log(data)
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: {
                        data: data[0],
                        total: data[1][0].total
                    },
                    Msg: '成功'
                }
                res.send(mydata);
                // model.getTagsRows(cbrow)
            } else {
                console.log(err)
                res.send({
                    Status: 400,
                    Data:err,
                    Msg: '数据获取失败'
                })
            }
        }
        let page = parseInt(req.param('page'))
        let pageSize = parseInt(req.param('pageSize'))
        let keywords = req.param('keyword')
        model.getThumbsList(page,pageSize,keywords, cb);
    },
    addThumb: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '添加成功'
                }
                res.send(mydata);
            } else {
                console.log(err)

                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据添加失败'
                })
            }
        }
        model.addThumb(req.body, cb);
    },
    updateThumb: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '修改成功'
                }
                res.send(mydata);
            } else {
                console.log(err)
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据修改失败'
                })
            }
        }
        model.updateThumb(req.body, cb);
    },
    delThumb: function (req,res) {
        function cb(err, data) {
            if (err == null) {
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '删除成功'
                }
                res.send(mydata);
            } else {
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '数据删除失败'
                })
            }
        }
        model.delThumb(req.body, cb);
    },

    // 前台 获取路由
    getRouter: function (req, res) {
        function cb(err, data) {
            if (err == null) {
                //console.log(mydata);
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '成功'
                }
                res.send(mydata);
            } else {
                res.send({
                    Status: 400,
                    Data:null,
                    Msg: '获取失败'
                });
            }
        }
        model.getRouter(cb);
    },
    getArticleOrder: function (req, res) {
        function cb(err, data) {
            console.log(data);
            if (err == null) {
                //console.log(mydata);
                let mydata = {
                    Status: 200,
                    Data: data,
                    Msg: '成功'
                }
                res.send(mydata);
            } else {
                res.send({
                    Status: 400,
                    Data:err,
                    Msg: '获取失败'
                });
            }
        }
        model.getArticleOrder(cb);
    },
};

module.exports = project;