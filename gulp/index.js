var path = require('path');

module.exports = function(gulp, plugins) {
  var cfg = require('./config');

  // Register all tasks
  require('./tasks')(gulp, plugins, cfg);

  // Expose custom multi-tasks
  gulp.task('default', ['nodemon']);
  gulp.task('test', ['test-unit', 'test-integration']);
};
