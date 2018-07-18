'use strict';

var url = require('url');
var User = require('./UserService');

module.exports.cmsUserCreate = function cmsUserCreate (req, res, next) {
  User.cmsUserCreate(req.swagger.params, res, next);
};

module.exports.cmsUserDelete = function cmsUserDelete (req, res, next) {
  User.cmsUserDelete(req.swagger.params, res, next);
};

module.exports.cmsUserInfo = function cmsUserInfo (req, res, next) {
  User.cmsUserInfo(req.swagger.params, res, next);
};

module.exports.cmsUserUpdate = function cmsUserUpdate (req, res, next) {
  User.cmsUserUpdate(req.swagger.params, res, next);
};

module.exports.cmsLogin = function cmsLogin (req, res, next) {
  User.cmsLogin(req.swagger.params, res, next);
};