var express = require('express');

var config = require('../../config');
var seasonsController = require('../../controllers/seasons');

module.exports = function(app) {
  var router = express.Router();

  router
    .get('/', seasonsController.get)
    ;

  app.use('/v' + config.get('app:major') + '/seasons', router);
};
