/*
* @Author: ZZZ
* @Date:   2018-05-10 14:55:03
* @Last Modified by:   jiejiege123
* @Last Modified time: 2018-06-26 15:09:26
*/
/* jshint esversion: 6 */
const express = require('express')
const router = express.Router()
//控制器
const control = require('../controller/index.js')
// 登录
router.route('/login')
	.post(control.login)

// 设置个人信息
router.route('/backend/profile')
	.post(control.profile)

router.route('/blog/getInfo')
	.get(control.getInfo)

// 临时 获取文章
router.route('/blog/article')
	.get(control.getArticle)

////////////////////////////////////////////////////////////////////  分类
// 获取分类 
router.route('/blog/getCategories')
	.get(control.getCategories)
router.route('/blog/getCategoriesAll')
	.get(control.getCategoriesAll)
// 添加分类
router.route('/backend/addCategories')
	.post(control.addCategories)
// 删除分类
router.route('/backend/delCategories')
	.post(control.delCategories)
// 编辑分类
router.route('/backend/updateCategories')
	.post(control.updateCategories)

////////////////////////////////////////////////////////////////////  标签
router.route('/blog/getTags')
	.get(control.getTags)
// 添加分类
router.route('/backend/addTags')
	.post(control.addTags)
// 删除分类
router.route('/backend/delTags')
	.post(control.delTags)
// 编辑分类
router.route('/backend/updateTags')
	.post(control.updateTags)

// 文章
router.route('/blog/getArticleList')
	.get(control.getArticleList)
router.route('/backend/addArticle')
	.post(control.addArticle)
// 删除文章
router.route('/backend/delArticle')
	.post(control.delArticle)
// 编辑文章
router.route('/backend/updateArticle')
	.post(control.updateArticle)

// 独立页面
router.route('/blog/getPagesList')
	.get(control.getPagesList)
router.route('/blog/getPage')
	.get(control.getPage)
router.route('/backend/addPages')
	.post(control.addPages)
// 删除独立页面
router.route('/backend/delPages')
	.post(control.delPages)
// 编辑独立页面
router.route('/backend/updatePages')
	.post(control.updatePages)



// /////////////////////////////////////// 博客前台
// 获取路由
router.route('/blog/getRouter')
	.get(control.getRouter)
router.route('/blog/getArticleOrder')
	.get(control.getArticleOrder)
	



module.exports = router
