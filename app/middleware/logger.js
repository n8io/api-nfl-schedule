var logger = require('morgan');
var config = require('../config');

module.exports = function(app) {
  var logFormat = config.get('EXPRESS_LOG_FORMAT');

  app.use(logger(logFormat));
};
