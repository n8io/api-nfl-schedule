var url = require('url');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var _ = require('lodash');
var logger = require('../../helpers/logger')();
var config = require('../../config');

var matchupsController = function() {};

matchupsController.get = get;

module.exports = matchupsController;

function get(req, res, next) {
  var uri = 'http://espn.go.com/nfl/schedule/_/year/' + req.season + '/seasontype/' + req.schedule + '/week/' + req.week;

  request(uri, function(err, results) {
    var matchups = [];
    var byes = [];
    var currentDate;
    var validStatuses = {
      LIVE: 'LIVE',
      COMPLETE: 'COMPLETE',
      FUTURE: 'FUTURE'
    };

    if(err) {
      logger.error(err);

      return res.status(500).json(matchups);
    }

    $ = cheerio.load(results.body);

    if($('#noScheduleContent').length) {
      logger.warn('No games found for: ' + uri);

      return res.status(404).json(matchups);
    }

    $('.responsive-table-wrap').each(function(index, item) {
      var $item = $(item);
      var strDate;
      var mDate;
      var status = validStatuses.COMPLETE;
      var isFuture = false;
      var matchup = {};

      if($item.find('caption').length) {
        strDate = $item.find('caption').eq(0).text() + ' ' + req.season.toString() + ' -05:00';
        mDate = moment(strDate, 'dddd, MMMM D, YYYY ZZ');

        if(mDate.isValid()) {
          currentDate = mDate.format('x');
        }
        else {
          currentDate = null;
        }
      }

      isFuture = !!$item.find('th.schedule-timezone').length;

      $item.find('table').remove('thead').remove('caption');

      var gameRows = $item.find('tr')
        .filter(function(x, item) {
          var $item = $(item);

          return $item.hasClass('odd') || $item.hasClass('even');
        })
        .not('.byeweek')
        ;

      $(gameRows).each(function(j, tr) {
        var matchup = {};
        var $tr = $(tr);

        var $tdAwayTeam = $($tr.find('td').eq(0));
        var $tdHomeTeam = $($tr.find('td').eq(1));
        var $tdGameId = $($tr.find('td').eq(2));

        if(isFuture) {
          if($item.find('td.live').length) {
            status = validStatuses.LIVE;
          }
          else {
            status = validStatuses.FUTURE;
          }
        }

        matchup.date = currentDate;
        matchup.awayTeam = parseTeamInfo($tdAwayTeam);
        matchup.homeTeam = parseTeamInfo($tdHomeTeam);
        matchup.id = parseGameId($tdGameId);
        matchup.status = status;

        matchups.push(matchup);
      });

      $item.find('tr.byeweek td a.team-name').each(function(m, a) {
        var $a = $(a);

        byes.push(parseTeamInfo($a));
      });
    });

    var data = {
      isFinal: _.all(matchups, {status: validStatuses.COMPLETE}),
      byes: byes,
      matchups: matchups
    };

    res.use_express_redis_cache = data.isFinal;

    return res.json(data);
  });
}

function parseTeamInfo($td) {
  var $a = $td;

  if($td.is('td')) {
    $a = $td.find('a.team-name').eq(0);
  }

  return {
    city: $td.find('span').eq(0).text(),
    abbr: $td.find('abbr').eq(0).text(),
    name: $td.find('abbr').eq(0).attr('title')
  };
}

function parseGameId($td) {
  var baseUrl = 'http://espn.go.com';
  var urlObj = url.parse(baseUrl + $td.find('a').eq(0).attr('href'), true);

  return urlObj.query.gameId;
}
