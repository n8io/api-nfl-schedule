var path = require('path');
var moment = require('moment');
var shell = require('shelljs');

var now = moment();

var validEnvironments = {
  local: 'local',
  loc: 'local',
  ci: 'dev',
  dev: 'dev',
  development: 'dev',
  prod: 'prod',
  production: 'prod'
};

var cfg = {
  env: validEnvironments[process.env.NODE_ENV || ''] || validEnvironments.local,
  test: {
    unit: {
      src: [path.join(__dirname, '../test/unit/**/*.spec.js')],
      options: {
        reporter: 'spec'
      }
    },
    integration: {
      src: [path.join(__dirname, '../test/integration/**/*.spec.js')],
      options: {
        reporter: 'spec'
      }
    }
  },
  nodemon: {
    script: path.join(__dirname, '../app/app.js'),
    ext: 'js',
    ignore: [
      path.join(__dirname, '../gulp/*.js')
    ]
  }
};

cfg.git = {
  commit: (shell.exec('git rev-parse --verify HEAD', {silent: true}).output || '').split('\n').join(''),
  branch: (shell.exec('git rev-parse --abbrev-ref HEAD', {silent: true}).output || '').split('\n').join('')
};

module.exports = cfg;
