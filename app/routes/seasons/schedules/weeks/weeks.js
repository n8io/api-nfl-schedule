var express = require('express');

var config = require('../../../../config');
var weeksController = require('../../../../controllers/weeks');

module.exports = function(app) {
  var router = express.Router();

  router
    .get('/', weeksController.get)
    ;

  app.use('/v' + config.get('app:major') + '/seasons/:season/schedules/:schedule/weeks', router);
};
