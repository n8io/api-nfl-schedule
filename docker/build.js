var fs = require('fs');
var path = require('path');
var semverRegex = require('semver-regex');
var replacestream = require('replacestream');

var buildType = (process.env.BUILD_TYPE || '').toLowerCase() === 'build' ? 'build' : 'local';
var dockerFileTemplatePath = path.join(__dirname, buildType, 'Dockerfile');
var destPath = path.join(__dirname, '..', 'Dockerfile');

var pkgJson = require('../package.json');

var nodeVersion = semverRegex().exec(pkgJson.engines.node)[0] || 'latest';

fs
  .createReadStream(dockerFileTemplatePath)
  .pipe(replacestream('{{NODE_VERSION}}', nodeVersion))
  .pipe(replacestream('{{MAINTAINER}}', pkgJson.author))
  .pipe(fs.createWriteStream(destPath));
