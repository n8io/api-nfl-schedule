var path = require('path');

module.exports = function(gulp, plugins, cfg) {
  gulp.task('nodemon', nodemon);

  function nodemon() {
    plugins.nodemon(cfg.nodemon);
  }
};
