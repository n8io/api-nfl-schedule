var express = require('express');
var rootConfigController = require('../../controllers/config');

module.exports = function(app) {
  var router = express.Router();

  router
    .get('/', rootConfigController.get)
    ;

  app.use('/config', router);
};
