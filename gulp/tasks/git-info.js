var path = require('path');
var fs = require('fs');
var shell = require('shelljs');

module.exports = function(gulp, plugins, cfg) {
  gulp.task('git-info', gitInfo);

  function gitInfo() {
    var git = {
      commit: (shell.exec('git rev-parse --verify HEAD', {silent: true}).output || '').split('\n').join(''),
      branch: (shell.exec('git rev-parse --abbrev-ref HEAD', {silent: true}).output || '').split('\n').join('')
    };

    fs.writeFileSync(path.join(__dirname, '../../.git.json'), JSON.stringify(git, null, 2));
  }
};
