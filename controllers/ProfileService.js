'use strict';
var db = require('../dbconnection.js');

exports.cmsAllProfiles = function(args, res, next) {
  console.log("Triggered Profile Search");
  // MySQL Statement
  var sql = "SELECT * FROM profile";
  db.query(
    sql, [], (err, result) => {
      if(err) {
        console.log("Error in executing MySQL Query for Profile Search: " + err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        next("Bad request. Check input parameters");
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      }
    });
}

exports.cmsDeleteProfilesForUser = function(args, res, next) {
  /**
   * Parameters expected in the args:
   * userPk (String)
   **/
  console.log("Triggered Profile Delete For a User");
  var userPk = args.userPk.value;
  console.log("Received data in request: " + JSON.stringify(userPk));
  // Profile Delete MySQL Statement
  var sql = "DELETE FROM profile WHERE UserPk = ?";
  db.query(
    sql, [userPk], (err, result) =>{
      if(err) {
        console.log("Error in executing MySQL Query for Profile Search: " + err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        next("Bad request. Check input parameters");
      } else {
        console.log("Deleted all profiles successfully with UserPk: " + userPk);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      }
    });
}

exports.cmsGetProfileByUser = function(args, res, next) {
  /**
   * parameters expected in the args:
   * userPk (String)
   **/
  console.log("Triggered Profile Search For a User");
  var userPk = args.userPk.value;
  console.log("Received data in request: " + JSON.stringify(userPk));
  // Profile Delete MySQL Statement
  var sql = "SELECT * FROM profile WHERE UserPk = ?";
  db.query(
    sql, [userPk], (err, result) =>{
      if(err) {
        console.log("Error in executing MySQL Query for Profile Search: " + err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        next("Bad request. Check input parameters");
      } else {
        console.log("Fetched all profiles successfully with UserPk: " + userPk);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      }
    });
}

exports.cmsProfileCreate = function(args, res, next) {
  /**
   * Parameters expected in the args:
   * profileData (ProfileData)
   **/
  console.log("Triggered Profile Create");
  var profileData = args.profileData.value;
  console.log("Received data in request: " + JSON.stringify(profileData));

  // Generate Pk
  var randomId = '_' + Math.random().toString(16).substr(2, 17);
  var income = '';
  var education = '';
  var occupation = '';
  var fathersName = '';
  var currentRecidence = '';
  var sex = '';
  var weight = '';
  var relatives = '';
  var userPk = '';
  var picture = '';
  var dob = '';
  var name = '';
  var nativePlace = '';
  var pk = '';
  var height = '';
  // Populate all fields
  if(profileData.income) { income = profileData.income; }
  if(profileData.education) { education = profileData.education; }
  if(profileData.occupation) { occupation = profileData.occupation; }
  if(profileData.fathersName) { fathersName = profileData.fathersName; }
  if(profileData.currentRecidence) { currentRecidence = profileData.currentRecidence; }
  if(profileData.sex) { sex = profileData.sex; }
  if(profileData.weight) { weight = profileData.weight; }
  if(profileData.relatives) { relatives = profileData.relatives; }
  if(profileData.userPk) { userPk = profileData.userPk; }
  if(profileData.picture) { picture = profileData.picture; }
  if(profileData.dob) { dob = profileData.dob; }
  if(profileData.name) { name = profileData.name; }
  if(profileData.nativePlace) { nativePlace = profileData.nativePlace; }
  if(profileData.pk) { pk = randomId; }
  if(profileData.height) { height = profileData.height; }

  // User Create MySQL Statement
  var userCreateSQL = "INSERT INTO profile(Income,Education, Occupation, FathersName, CurrentResidence, Sex, Weight, Relatives, UserPk, Picture, Dob, Name, NativePlace, Pk, Height) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    userCreateSQL, [income, education, occupation, fathersName, currentRecidence, sex, weight, relatives, userPk, picture, dob, name, nativePlace, pk, height], (err, result) => {
      if(err) {
        console.log("Error in executing MySQL Query for Profile Create: " + err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        next("Bad request. Check input parameters");
      }
      else {
        console.log("Data inserted successfully with id: " + pk);
        db.query("SELECT * FROM profile WHERE Pk = ?", [randomId], (err, result) => {
          console.log("Fetched result: " + JSON.stringify(result));
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        });      
      }
    });
}

exports.cmsProfileDelete = function(args, res, next) {
  /**
   * Parameters expected in the args:
   * profilePk (String)
   **/
  console.log("Triggered Profile Delete");
  var profilePk = args.profilePk.value;
  console.log("Received data in request: " + JSON.stringify(profilePk));
  // Profile Delete MySQL Statement
  var sql = "DELETE FROM profile WHERE Pk = ?";
  db.query(
    sql, [profilePk], (err, result) =>{
      if(err) {
        console.log("Error in executing MySQL Query for Profile Delete: " + err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        next("Bad request. Check input parameters");
      } else {
        console.log("Deleted profile successfully with Pk: " + profilePk);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      }
    });
}

exports.cmsProfileInfo = function(args, res, next) {
  /**
   * Parameters expected in the args:
   * profilePk (String)
   **/
  console.log("Triggered Profile Search For a User");
  var profilePk = args.profilePk.value;
  console.log("Received data in request: " + JSON.stringify(profilePk));
  // Profile Delete MySQL Statement
  var sql = "SELECT * FROM profile WHERE Pk = ?";
  db.query(
    sql, [profilePk], (err, result) =>{
      if(err) {
        console.log("Error in executing MySQL Query for Profile Search: " + err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        next("Bad request. Check input parameters");
      } else {
        console.log("Fetched all profiles successfully with UserPk: " + profilePk);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      }
    });
}

exports.cmsProfileUpdate = function(args, res, next) {
  /**
   * Parameters expected in the args:
   * profilePk (String)
   * updateInfo (ProfileData)
   **/
  console.log("Triggered User Update");
  var profilePk = args.profilePk.value;
  var updateInfo = args.updateInfo.value;
  console.log("Received data in request: " + JSON.stringify(updateInfo));

  // User Create MySQL Statement
  var sql = "UPDATE profile SET ";
  var delimitter = "";
  if(updateInfo.income != null) {
    sql = sql + "Income = '" + updateInfo.income;
    delimitter = "', ";
  }
  if(updateInfo.education != null) {
    sql = sql + delimitter + "Education = '" + updateInfo.education;
    delimitter = "', ";
  }
  if(updateInfo.occupation != null) {
    sql = sql + delimitter + "Occupation = '" + updateInfo.occupation;
    delimitter = "', ";
  }
  if(updateInfo.currentResidence != null) {
    sql = sql + "CurrentResidence = '" + updateInfo.currentResidence;
    delimitter = "', ";
  }
  if(updateInfo.sex != null) {
    sql = sql + delimitter + "Sex = '" + updateInfo.sex;
    delimitter = "', ";
  }
  if(updateInfo.weight != null) {
    sql = sql + delimitter + "Weight = '" + updateInfo.weight;
    delimitter = "', ";
  }
  if(updateInfo.relatives != null) {
    sql = sql + "Relatives = '" + updateInfo.relatives;
    delimitter = "', ";
  }
  if(updateInfo.userPk != null) {
    sql = sql + delimitter + "UserPk = '" + updateInfo.userPk;
    delimitter = "', ";
  }
  if(updateInfo.picture != null) {
    sql = sql + delimitter + "Picture = '" + updateInfo.picture;
    delimitter = "', ";
  }
  if(updateInfo.dob != null) {
    sql = sql + delimitter + "Dob = '" + updateInfo.dob;
    delimitter = "', ";
  }
  if(updateInfo.Name != null) {
    sql = sql + "Name = '" + updateInfo.name;
    delimitter = "', ";
  }
  if(updateInfo.nativePlace != null) {
    sql = sql + delimitter + "NativaPlace = '" + updateInfo.nativePlace;
    delimitter = "', ";
  }
  if(updateInfo.height != null) {
    sql = sql + delimitter + "Height = '" + updateInfo.height;
    delimitter = "', ";
  }
  if(updateInfo.fathersName != null) {
    sql = sql + delimitter + "FathersName = '" + updateInfo.fathersName;
  }
    sql = sql + "' WHERE Pk = '" + profilePk + "'";
  db.query( sql, (err, result) =>{
    if(err) {
      console.log("Error in executing MySQL Query for Profile: " + err);
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      next("Bad request. Check input parameters");
    }
    else {
      console.log("Data Updated Successfully For ProfilePk: " + profilePk);
      db.query("SELECT * FROM profile WHERE Pk = ?", [profilePk], (err, result) => {
        console.log("Fetched result: " + JSON.stringify(result));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      });      
    }
  });
}

