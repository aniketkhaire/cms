var mysql = require('mysql');
var connection = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'root',
  database:'cms'
});
module.exports=connection;