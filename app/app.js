var express = require('express');
var app = express();
var server;
var port = process.env.PORT || 3000;
var listeningIp = process.env.HOST || '0.0.0.0';

require('./middleware')(app);
require('./routes')(app);

server = app.listen(port, listeningIp, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('%s@%s listening at http://%s:%s on NodeJs',
    process.env.npm_package_name,
    process.env.npm_package_version,
    host,
    port,
    process.version
  );
});
