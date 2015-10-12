var request = require('request');
var logger = require('../../helpers/logger')();
var cheerio = require('cheerio');

var rootSeasonsController = function() {};

rootSeasonsController.get = get;

module.exports = rootSeasonsController;

function get(req, res) {
  var uri = 'http://espn.go.com/nfl/scoreboard';

  request(uri, function(err, results) {
    var seasons = [];

    if(err) {
      logger.error(err);

      return res.status(500).json(seasons);
    }

    $ = cheerio.load(results.body);

    $('.dropdown-type-season').find('option').each(function(index, opt) {
      seasons.push(~~$(opt).text());
    });

    return res.json(seasons);
  });
}
