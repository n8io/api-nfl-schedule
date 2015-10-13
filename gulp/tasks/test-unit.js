var path = require('path');

module.exports = function(gulp, plugins, cfg) {
  gulp.task('test-unit', testUnit);

  function testUnit(done) {
    gulp.src(cfg.test.unit.src)
      .pipe(plugins.mocha())
      .on('end', done)
      ;
  }
};
