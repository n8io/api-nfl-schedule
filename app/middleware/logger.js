var logger = require('morgan');

module.exports = function(app) {
  var logFormat = process.env.LOGGER_LOGFMT || 'tiny';

  app.use(logger(logFormat));
};
