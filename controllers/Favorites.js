'use strict';

var url = require('url');
var Favorites = require('./FavoritesService');

module.exports.cmsAddFavorite = function cmsAddFavorite (req, res, next) {
  Favorites.cmsAddFavorite(req.swagger.params, res, next);
};

module.exports.cmsGetFavorites = function cmsGetFavorites (req, res, next) {
  Favorites.cmsGetFavorites(req.swagger.params, res, next);
};

module.exports.cmsRemoveFavorite = function cmsRemoveFavorite (req, res, next) {
  Favorites.cmsRemoveFavorite(req.swagger.params, res, next);
};
