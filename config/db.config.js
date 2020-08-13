'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  // please replace this with your hostname / IP Address
  host     : process.env.MYSQL_URL,
  // Please replace this with your username
  user     : process.env.MYSQL_USERNAME,
  // Please replace this with your password
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;