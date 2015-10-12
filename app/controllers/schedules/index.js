var request = require('request');
var logger = require('../../helpers/logger')();
var cheerio = require('cheerio');

var schedulesController = function() {};

schedulesController.get = get;

module.exports = schedulesController;

function get(req, res) {
  return res
    .status(200)
    .json([
      {
        id: 1,
        key: 'PRESEASON'
      },
      {
        id: 2,
        key: 'REGULAR'
      },
      {
        id: 3,
        key: 'POSTSEASON'
      }
    ]);
}
