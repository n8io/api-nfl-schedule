var express = require('express');
var rootController = require('../controllers/root');

module.exports = function(app) {
  var router = express.Router();

  router
    .get('/', rootController.get)
    ;

  app.use('/', router);
};
