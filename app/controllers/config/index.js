var os = require('os');
var sortJson = require('sort-json');
var config = require('../../config');

var rootConfigController = function() {};

rootConfigController.get = get;

module.exports = rootConfigController;

function get(req, res, next) {
  var isAuthd = isAuthorized(req.query, req.headers);
  var data;

  if(!isAuthd) {
    return next();
  }

  data = config.get();

  return res
    .status(200)
    .json(sortJson(data))
    ;

  function isAuthorized(qs, headers) {
    var key = config.get('ADMIN_KEY');

    if(!key) {
      return;
    }

    return qs.accesskey === key || headers.accesskey === key;
  }
}
