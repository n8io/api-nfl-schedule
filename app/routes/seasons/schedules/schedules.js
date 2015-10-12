var express = require('express');

var config = require('../../../config');
var schedulesController = require('../../../controllers/schedules');
var cacheConfig = {
  host: config.get('REDIS_HOST'),
  port: config.get('REDIS_PORT'),
  auth_pass: config.get('REDIS_PASSWORD')
};
var cache = require('express-redis-cache')(cacheConfig);

module.exports = function(app) {
  var router = express.Router();

  router
    .get('/', cache.route(), schedulesController.get)
    ;

  app.use('/v' + config.get('app:major') + '/seasons/:season/schedules', router);
};
