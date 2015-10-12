var express = require('express');
var heartbeatController = require('../controllers/heartbeat');

module.exports = function(app) {
  var router = express.Router();

  router
    .get('/heartbeat', heartbeatController.get)
    .get('/', heartbeatController.get)
    ;

  app.use('/', router);
};
