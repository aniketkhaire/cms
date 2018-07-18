'use strict';

var url = require('url');


var Profile = require('./ProfileService');


module.exports.cmsAllProfiles = function cmsAllProfiles (req, res, next) {
  Profile.cmsAllProfiles(req.swagger.params, res, next);
};

module.exports.cmsDeleteProfilesForUser = function cmsDeleteProfilesForUser (req, res, next) {
  Profile.cmsDeleteProfilesForUser(req.swagger.params, res, next);
};

module.exports.cmsGetProfileByUser = function cmsGetProfileByUser (req, res, next) {
  Profile.cmsGetProfileByUser(req.swagger.params, res, next);
};

module.exports.cmsProfileCreate = function cmsProfileCreate (req, res, next) {
  Profile.cmsProfileCreate(req.swagger.params, res, next);
};

module.exports.cmsProfileDelete = function cmsProfileDelete (req, res, next) {
  Profile.cmsProfileDelete(req.swagger.params, res, next);
};

module.exports.cmsProfileInfo = function cmsProfileInfo (req, res, next) {
  Profile.cmsProfileInfo(req.swagger.params, res, next);
};

module.exports.cmsProfileUpdate = function cmsProfileUpdate (req, res, next) {
  Profile.cmsProfileUpdate(req.swagger.params, res, next);
};
