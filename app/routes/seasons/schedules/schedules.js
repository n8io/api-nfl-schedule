var express = require('express');

var config = require('../../../config');
var schedulesController = require('../../../controllers/schedules');

module.exports = function(app) {
  var router = express.Router();

  router
    .get('/', schedulesController.get)
    ;

  app.use('/v' + config.get('app:major') + '/seasons/:season/schedules', router);
};
