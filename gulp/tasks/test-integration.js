var path = require('path');

module.exports = function(gulp, plugins, cfg) {
  gulp.task('test-integration', testIntegration);

  function testIntegration(done) {
    gulp.src(cfg.test.integration.src)
      .pipe(plugins.mocha())
      .on('end', done)
      ;
  }
};
