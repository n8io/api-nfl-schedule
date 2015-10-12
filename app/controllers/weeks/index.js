var request = require('request');
var logger = require('../../helpers/logger')();
var cheerio = require('cheerio');

var schedulesController = function() {};

schedulesController.get = get;

module.exports = schedulesController;

function get(req, res) {
  var scheduleType = req.schedule;
  var weeks = 0;

  switch(parseInt(scheduleType, 10)) {
    case 1:
    case 3:
      weeks = 5;
      break;
    default:
      weeks = 17;
      break;
  }

  return res
    .status(200)
    .json(Array.apply(0, Array(weeks)).map(function(x, y) { return y + 1; }));
}
