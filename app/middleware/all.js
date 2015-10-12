var express = require('express');
var _ = require('lodash');

var config = require('../config');

module.exports = function(app) {
  var router = express.Router();

  router
    .get('*', function(req, res, next) {
      _.each(_.keys(req.query), function(key) {
        req.query[key.toLowerCase()] = req.query[key];
      });

      _.each(_.keys(req.headers), function(key) {
        req.headers[key.toLowerCase()] = req.headers[key];
      });

      return next();
    })
    ;

  app.use('/', router);
};
