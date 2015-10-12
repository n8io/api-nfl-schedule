var moment = require('moment');

var utils = function() {};

utils.getCurrentSeason = getCurrentSeason;

module.exports = utils;

function getCurrentSeason() {
  var now = moment();

  if(now.month() < 9) {
    return now.year() - 1;
  }

  return now.year();
}
