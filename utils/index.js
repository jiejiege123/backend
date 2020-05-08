/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 23:54:33
 * @LastEditTime: 2019-12-06 10:47:58
 * @LastEditors: Please set LastEditors
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}
/**
 * @description: 生成随机密码
 * @param {size}: size是生成随机密码的位数
 * @return:
 */
// eslint-disable-next-line no-irregular-whitespace
function  randomPassword(size) {
  var seed = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'Q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']// 数组var
  var seedlength = seed.length// 数组长度var
  var createPassword = ''
  for (let i = 0; i < size; i++) {
    var a = Math.floor(Math.random() * seedlength)
    createPassword += seed[a]
  }
  return createPassword
}
/**
 * @description: 三证一体验证
 * @param {type}
 * @return:
 */
function CheckSocialCreditCode(Code) {
  var patrn = /^[0-9A-Z]+$/
  // 18位校验及大写校验
  if ((Code.length !== 18) || (patrn.test(Code) === false)) {
    return false
  } else {
    var Ancode// 统一社会信用代码的每一个值
    var Ancodevalue// 统一社会信用代码每一个值的权重
    var total = 0
    var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]// 加权因子
    var str = '0123456789ABCDEFGHJKLMNPQRTUWXY'
    // 不用I、O、S、V、Z
    for (var i = 0; i < Code.length - 1; i++) {
      Ancode = Code.substring(i, i + 1)
      Ancodevalue = str.indexOf(Ancode)
      total = total + Ancodevalue * weightedfactors[i]
      // 权重与加权因子相乘之和
    }
    var logiccheckcode = 31 - total % 31
    if (logiccheckcode === 31) {
      logiccheckcode = 0
    }
    var Str = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y'
    var Array_Str = Str.split(',')
    logiccheckcode = Array_Str[logiccheckcode]
    var checkcode = Code.substring(17, 18)
    if (logiccheckcode !== checkcode) {
      return false
    }
    return true
  }
}

/**
 * @description: 验证手机号
 * @param {type}
 * @return:
 */
function checkPhone(phone) {
  if (!(/^1[3456789]\d{9}$/.test(phone)) && !(/0\d{2,3}-\d{7,8}/.test(phone))) {
    return false
  } else {
    return true
  }
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
function dateForamt(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  return fmt
}

/**
 * @description: 验证车架号
 * @param {type}
 * @return:
 */
function checkCarCode(vin) {
  if (vin.length > 0 && vin.length !== 17) {
    return false
  } else {
    return true
  }
}

/**
 * @description: 封装函数 实现深浅拷贝  deep为true深拷贝 false浅拷贝
 * @param {type}
 * @return:
 */
function copy(oldObj, deep = true) {
  let newObj = {}
  if (oldObj instanceof Array) {
    newObj = []
  }
  for (const key in oldObj) {
    const value = oldObj[key]
    if (!!deep && typeof value === 'object' && value !== null) { // 如果原对象的某个属性是引用类型数据，递归调用copy
      newObj[key] = copy(value, deep)
    } else { // 如果原对象的某个属性是基本类型数据，直接将此属性赋值给新对象的相应属性
      newObj[key] = value
    }
  }
  return newObj
}

/**
 * @description: 身份证校验
 * @param {type}
 * @return:
 */
function validateIdCard(idCard) {
  // 15位和18位身份证号码的正则表达式
  var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  // 如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length === 18) {
      var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 将前17位加权因子保存在数组里
      var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2] // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0 // 用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
      }
      var idCardMod = idCardWiSum % 11// 计算出校验码所在数组的位置
      var idCardLast = idCard.substring(17)// 得到最后一位身份证号码
      // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod === 2) {
        if (idCardLast === 'X' || idCardLast === 'x') {
          return true
        } else {
          return false
        }
      } else {
        // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast === (idCardY[idCardMod] + '')) {
          return true
        } else {
          return false
        }
      }
    }
  } else {
    return false
  }
}

/**
 * @description: '判断浏览器类型'
 * @param {type} ''
 * @return: ''
 */
function checkBrowser() {
  var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf('Opera') > -1
  if (isOpera) {
    return 'Opera'
  } // 判断是否Opera浏览器
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  } // 判断是否Firefox浏览器
  if (userAgent.indexOf('Chrome') > -1) {
    if (userAgent.indexOf('Edge') > -1) {
      return 'Edge'
    } else {
      return 'Chrome'
    }
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  } // 判断是否Safari浏览器
  if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    return 'IE'
  } // 判断是否IE浏览器
}

/**
 * @description: '父id 递归'
 * @param {type} ''
 * @return: ''
 */
function listToTree(data) {
  const list = {}
  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    // 此行代码用以统一根节点的paren_id, 跟节点的parent_id 可以为 0 或 null
    row.pid = row.pid ? row.pid : 0
    if (list[row.id]) {
      Object.assign(list[row.id], { id: row.id, text: row.name })
    } else {
      // list[row.id] = { id: row.id, text: row.name, children: [] }
      list[row.id] = { id: row.id, text: row.name }
    }
    if (list[row.pid]) {
      list[row.pid].children.push(list[row.id])
    } else {
      list[row.pid] = { children: [list[row.id]] }
    }
  }
  return list[0].children
}
/**
 * @description: '父id 递归'
 * @param {type} ''
 * @return: ''
 */
function toTree(data) {
  // 删除 所有 children,以防止多次调用
  data.forEach(function(item) {
    delete item.children
  })

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  var map = {}
  data.forEach(function(item) {
    map[item.Code] = item
  })
  //        console.log(map);
  var val = []
  data.forEach(function(item) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    var parent = map[item.PCode]
    // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item)
    }
  })
  return val
}
/**
 * @description: '判断json字符串格式是否正确'
 * @param {type} ''
 * @return: ''
 */
function isJSON(str) {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.error('error：' + str + '!!!' + e)
      return false
    }
  }
}
function getPixelRatio(context) {
  var backingStore = context.backingStorePixelRatio ||
  context.webkitBackingStorePixelRatio ||
  context.mozBackingStorePixelRatio ||
  context.msBackingStorePixelRatio ||
  context.oBackingStorePixelRatio ||
  context.backingStorePixelRatio || 1
  return (window.devicePixelRatio || 1) / backingStore
}

/**
 * @description: "数组 去重相加"
 * @param {Array} arr 数组
 * @param {Number} id 去重的标志
 * @param {String} prop 相加的元素
 * @return: ''
 */
function arryIdSum(arr, id = 'id', prop = 'value') {
  const newArr = []
  arr.forEach(el => {
    const result = newArr.findIndex(ol => { return el[id] === ol[id] })
    if (result !== -1) {
      newArr[result][prop] = parseInt(newArr[result][prop]) + parseInt(el[prop])
    } else {
      newArr.push(el)
    }
  })
  return newArr
  // console.log(newArr)
}
/**
 * @description: "小数和百分比转换"
 * @param {String}} 'p'
 * @param {String}} 'type' 转换类型 po: 转换为小数 per: 转换为百分比
 * @return: ''
 */
function ptwop(p, type = 'po') {
  if (type === 'po') {
    var str = p.replace('%', '')
    str = str / 100
    return str
  } else {
    var str2 = Number(p * 100).toFixed(1)
    str2 += '%'
    return str2
  }
  // console.log(newArr)
}

/**
 * @description 非路由获取url参数
 * @param {String} name 参数名
 * @param {http} url url
 */
// 使用方法
// import { getUrlKey } from '@/utils/index'
// this.id  = getUrlKey("id ",window.location.href)

// 如果url中参数base64编码
// let path = window.location.href.split("?") //分割url
// let href = path[0]+"?"+path[1]
// let query = Base64.decode(path[1])  //解码
// href = path[0]+"?"+ query //解码后重组
// this.id  = getUrlKey("id ",href)
function getUrlKey(name, url) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ''])[1].replace(/\+/g, '%20')) || null
}

module.exports = parseTime