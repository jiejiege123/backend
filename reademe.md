node+express+mysql

使用前需要配置好数据库、建表。

修改 db/dbConfig.js 下

config 为自己数据库数据
```
config:{
  host: "localhost",
  user: "root",
  password: "qwerbnm123",
  port: 3306,
  database: "blog",
  ...
},
```

数据库表的创建命令：mysql/setBase.sql 

注意：mysql8 如果安装的时候是一路默认，需要改加密方式，否则等不上去。或者可以升级 node 的 mysql 模块。
修改 mysql8 加密方式：

在 MySql line Client 中输入密码，进入命令行，

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'qwerbnm123';
``` 