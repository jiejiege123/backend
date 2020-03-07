/*
* @Author: ZZZ
* @Date:   2018-04-23 00:34:18
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-19 20:03:08
*/

const mysql = require('mysql');
const connect = {
	config:{
		// host:"192.168.3.241",
		host: "localhost",
        user: "root",
        password: "jiejiege",
        port: 3306,
        //database: "flowersback",
        database: "blog",
        multipleStatements: true,
	},
	connection:function(sql,param,cb){
        let myconnect = mysql.createConnection(this.config);
        myconnect.connect();
        myconnect.query(sql, param, cb);
        myconnect.end(
            function(err){
                if(err){
                    console.log(err);
                }
            }
        )
	}
};

module.exports = connect;