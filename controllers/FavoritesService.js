'use strict';
var db = require('../dbconnection.js');

exports.cmsAddFavorite = function(args, res, next) {
  /**
   * Parameters expected in the args:
   * profilePk (String)
   * favoriteData (FavoriteData)
   **/
  console.log("Triggered Favorite Create");
  var profilePk = args.profilePk.value;
  var favoriteData = args.favoriteData.value;
  console.log("Received data in request: " + JSON.stringify(favoriteData));

  // Generate Pk
  var randomId = '_' + Math.random().toString(16).substr(2, 17);
  // Favorite Create MySQL Statement
  var sql = "INSERT INTO favorites(Pk, UserPk, FavoritePk) VALUES (?,?,?)";
  db.query(
    userCreateSQL, [randomId, favoriteData.userPk, favoriteData.favoritePk], (err, result) => {
      if(err) {
        console.log("Error in executing MySQL Query for FavoriteCreate: " + err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        next("Bad request. Check input parameters");
      }
      else {
        console.log("Data inserted successfully with id: " + randomId);
        db.query("SELECT * FROM favorites WHERE Pk = ?", [randomId], (err, result) => {
          console.log("Fetched result: " + JSON.stringify(result));
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        });      
      }
    });
}

exports.cmsGetFavorites = function(args, res, next) {
  /**
   * Parameters expected in the args:
   * profilePk (String)
   **/
  console.log("Triggered Favorite Search");
  var profilePk = args.profilePk.value;
  console.log("Received data in request: " + JSON.stringify(profilePk));
  // User Create MySQL Statement
  var sql = "SELECT * FROM favorites WHERE UserPk = ?";
  db.query(
    sql, [profilePk], (err, result) =>{
      if(err) {
        console.log("Error in executing MySQL Query for Favorite Search: " + err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        next("Bad request. Check input parameters");
      } else {
        console.log("Data found successfully with UserProfile Pk: " + profilePk);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      }
    });
}

exports.cmsRemoveFavorite = function(args, res, next) {
  /**
   * Parameters expected in the args:
   * profilePk (String)
   * favoriteInfo (FavoriteData)
   **/
  console.log("Triggered Favorite Delete");
  var userPk = args.profilePk.value;
  var favoriteProfilePk = args.favoriteProfilePk.value;
  // User Delete MySQL Statement
  var sql = "DELETE FROM favorites WHERE UserPk = ? AND FavoritePk = ?";
  db.query(
    sql, [userPk, favoriteProfilePk], (err, result) =>{
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

