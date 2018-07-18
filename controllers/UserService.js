'use strict';
var db = require('../dbconnection.js');

exports.cmsUserCreate = function(args, res, next) {
  /**
   * Parameters expected in the args:
   * userData (UserData)
   **/
  console.log("Triggered User Create");
  var userData = args.userData.value;
  console.log("Received data in request: " + JSON.stringify(userData));

  // Generate Pk
  var randomId = '_' + Math.random().toString(16).substr(2, 17);
  // User Create MySQL Statement
  var userCreateSQL = "INSERT INTO user(Pk, Name, Password, Phone, Status) VALUES (?,?,?,?,?)";
  db.query(
    userCreateSQL, [randomId, userData.name, userData.password, userData.phone, userData.status], (err, result) => {
      if(err) {
        console.log("Error in executing MySQL Query for UserCreate: " + err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        next("Bad request. Check input parameters");
      }
      else {
        console.log("Data inserted successfully with id: " + randomId);
        db.query("SELECT * FROM user WHERE Pk = ?", [randomId], (err, result) => {
          console.log("Fetched result: " + JSON.stringify(result));
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        });      
      }
    });
}

exports.cmsUserDelete = function(args, res, next) {
  /**
   * Parameters expected in the args:
   * userPk (String)
   **/
  console.log("Triggered User Delete");
  var userPk = args.userPk.value;
  console.log("Received data in request: " + JSON.stringify(userPk));
  // User Delete MySQL Statement
  var sql = "DELETE FROM user WHERE pk = ?";
  db.query(
    sql, [userPk], (err, result) =>{
      if(err) {
        console.log("Error in executing MySQL Query for UserDelete: " + err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        next("Bad request. Check input parameters");
      } else {
        console.log("Data deleted successfully with UserPk: " + userPk);
        res.setHeader('Content-Type', 'application/json');
        res.end();
      }
    });
}

exports.cmsUserInfo = function(args, res, next) {
  /**
   * Parameters expected in the args:
   * userPk (String)
   **/
  console.log("Triggered User Search");
  var userPk = args.userPk.value;
  console.log("Received data in request: " + JSON.stringify(userPk));
  // User Create MySQL Statement
  var sql = "SELECT * FROM user WHERE Pk = ?";
  db.query(
    sql, [userPk], (err, result) =>{
      if(err) {
        console.log("Error in executing MySQL Query for UserSearch: " + err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        next("Bad request. Check input parameters");
      } else {
        console.log("Data found successfully with UserPk: " + userPk);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      }
    });
}

exports.cmsUserUpdate = function(args, res, next) {
  /**
   * Parameters expected in the args:
   * userPk (String)
   * updateInfo (UserData)
   **/
  console.log("Triggered User Update");
  var userPk = args.userPk.value;
  var updateInfo = args.updateInfo.value;
  console.log("Received data in request: " + JSON.stringify(updateInfo));

  // User Create MySQL Statement
  var sql = "UPDATE user SET ";
  var delimitter = "";
  if(updateInfo.name != null) {
    sql = sql + "Name = '" + updateInfo.name;
    delimitter = "', ";
  }
  if(updateInfo.password != null) {
    sql = sql + delimitter + "Password = '" + updateInfo.password;
    delimitter = "', ";
  }
  if(updateInfo.phone != null) {
    sql = sql + delimitter + "Phone = '" + updateInfo.phone;
    delimitter = "', ";
  }
  if(updateInfo.status != null) {
    sql = sql + delimitter + "Status = '" + updateInfo.status;
  }
    sql = sql + "' WHERE Pk = '" + userPk + "'";
  db.query( sql, (err, result) =>{
    if(err) {
      console.log("Error in executing MySQL Query for UserUpdate: " + err);
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      next("Bad request. Check input parameters");
    }
    else {
      console.log("Data Updated Successfully For UserPk: " + userPk);
      db.query("SELECT * FROM user WHERE Pk = ?", [userPk], (err, result) => {
        console.log("Fetched result: " + JSON.stringify(result));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      });      
    }
  });
}

exports.cmsLogin = function(args, res, next) {
  /**
   * Parameters expected in the args:
   * username (String)
   * password (String)
   **/
  console.log("Triggered User Login");
  var phoneNumber = args.username.value;
  var password = args.password.value;
//  console.log("Received data in request: " + JSON.stringify(updateInfo));

  // User Create MySQL Statement
  var sql = "SELECT * FROM user WHERE Phone = ? AND Password = ? ";
  db.query(
    sql, [phoneNumber, password], (err, result) =>{
      if(err) {
        console.log("Error in executing MySQL Query for UserSearch: " + err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        next("Bad request. Check input parameters");
      } else {
        if(result.length == 0) {
          console.log("Invalid Credentials");
          res.statusCode = 400;
          res.end();
        } else {
          console.log("Data found successfully with UserPk: " + result.length);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        }
      }
    });
}