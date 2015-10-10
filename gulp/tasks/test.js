var path = require('path');

module.exports = function(gulp, plugins, cfg) {
  gulp.task('test', test);

  function test(done) {
    gulp.src(cfg.test.src)
      .pipe(plugins.mocha())
      .on('end', done)
      ;
  }
};
