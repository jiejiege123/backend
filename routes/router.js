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
const control = require('../controller/test.js')
// 测试 get
router.route('/getTestApi')
	.get(control.getTest)

router.route('/getTestApiPost')
	.post(control.getTestPost)
// 测试 get 传参
// router.route('/getTestApi')
// 	.get(control.getTest)

module.exports = router
