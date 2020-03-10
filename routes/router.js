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
// 测试 get
router.route('/getTestApi')
	.get(control.getTest)

router.route('/getTestApiPost')
	.post(control.getTestPost)


// 登录
router.route('/login')
	.post(control.login)

// 设置个人信息
router.route('/blog/profile')
	.post(control.profile)

router.route('/blog/getInfo')
	.get(control.getInfo)
module.exports = router
