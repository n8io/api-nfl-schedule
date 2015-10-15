var express = require('express');
var app = express();
var config = require('./config');
var logger = require('./helpers/logger')();
var server;
var port = config.get('PORT');
var listeningIp = config.get('HOST');

require('./middleware')(app);
require('./routes')(app);

server = app.listen(port, listeningIp, function() {
  var host = server.address().address;
  var port = server.address().port;

  logger.info('%s@%s listening at http://%s:%s on NodeJs',
    config.get('npm_package_name'),
    config.get('npm_package_version'),
    host,
    port,
    process.version
  );
});

module.exports = server;
