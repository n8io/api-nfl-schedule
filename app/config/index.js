var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var cfg = require('nconf');

var envKeys = require(path.join(__dirname, '../.environment'));
var commitFile = path.join(__dirname, '../../.git.json');
var packageJson = path.join(__dirname, '../../package.json');

var validEnvironments = {
  loc: 'local',
  local: 'local',
  ci: 'dev',
  dev: 'dev',
  development: 'dev',
  qa: 'qa',
  prod: 'prod',
  production: 'prod'
};

var envSettings = parseEnvironmentVars(envKeys);

var version = '0.0.0';

cfg.use('memory');

cfg.env(envSettings.env);

if(fs.existsSync(packageJson)) {
  cfg.set('pkgJson', JSON.parse(fs.readFileSync(packageJson, 'utf-8')));

  if(!cfg.get('npm_package_version')) {
    cfg.set('npm_package_version', cfg.get('pkgJson:version'));
  }

  if(!cfg.get('npm_package_name')) {
    cfg.set('npm_package_name', cfg.get('pkgJson:name'));
  }
}

if(fs.existsSync(commitFile)) {
  cfg.set('git', JSON.parse(fs.readFileSync(commitFile, 'utf-8')));
}

cfg.set('NODE_ENV', validEnvironments[cfg.get('NODE_ENV')] || validEnvironments.prod);
cfg.set('app:major', cfg.get('npm_package_version').split('.')[0]);
cfg.set('app:minor', cfg.get('npm_package_version').split('.')[1]);
cfg.set('app:revision', cfg.get('npm_package_version').split('.')[2]);

cfg.defaults(envSettings.defaults);

module.exports = cfg;

// Parse the envionments array and give me a workable object back
function parseEnvironmentVars(keys) {
  var data = {
    env: [],
    defaults: {}
  };

  _.each(keys, function(key) {
    var name = key;

    if(typeof key === 'object') {
      name = _.keys(key)[0];
      data.defaults[name] = _.values(key)[0];
    }

    data.env.push(name);
  });

  return data;
}
