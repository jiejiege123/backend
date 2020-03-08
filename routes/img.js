var express = require('express');
var fs = require('fs');
var multer = require('multer');
var router = express.Router();
const moment = require('moment');


//设置文件上传存储路径
var uploadDir = `./public/uploads/${moment().format('YYYYMMDD')}`;
fs.mkdirSync(uploadDir, {
    recursive: true
}); // recursive 使用递归创建目录，如果父目录不存在会先创建

const storage = multer.diskStorage({ // 设置上传中间件
    destination: function (req, file, cb) { // 上传路径
        // console.log(file);
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) { // 上传之后的文件名
        // console.log(file);
        cb(null, Date.now() + '-' + file.originalname);
    }
})
//设置multer upload
var upload = multer({
    storage: storage
}).array('images');

//post请求 提交表单
router.post('/blog/uploadImage', function (req, res, next) {
    //多个文件上传
    upload(req, res, function (err) {
        if (err) {
            console.error('1.[System] ' + err.message);
        } else {
            //循环处理
            var imgPath=[];
            req.files.forEach(function (i) {
              console.log(i)
                //获取文件的存储路径
                // 去掉public
                let path = i.path.slice(6)
                imgPath.push(
                  {
                    filename: i.filename,
                    path: path
                  }
                )
            });

            //所有文件上传成功
            //回复信息
            var reponse = {
                message: 'File uploaded successfully',
                imgPath
            };
            //返回
            res.send(JSON.stringify(reponse));
        }
    });
});

module.exports = router