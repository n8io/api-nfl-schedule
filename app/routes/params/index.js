var express = require('express');
var moment = require('moment');

var config = require('../../config');
var matchupsController = require('../../controllers/matchups');
var utils = require('../../helpers/utils');

module.exports = function(app) {
  app.param('season', function(req, res, next, season) {
    var isValidSeason = validateSeason(season);

    if(!isValidSeason) {
      return res
        .status(400)
        .json({
          code: 4444,
          message: 'Invalid season parameter [' + season + ']. Season must be between 2002 and ' + utils.getCurrentSeason()
        })
        ;
    }

    req.season = season;

    return next();
  });

  app.param('schedule', function(req, res, next, schedule) {
    var isValidSchedule = validateSchedule(schedule);

    if(!isValidSchedule) {
      return res
        .status(400)
        .json({
          code: 3333,
          message: 'Invalid schedule parameter [' + schedule + ']. Schedule must be 1=PRESEASON, 2=REGULAR, or 3=POST'
        })
        ;
    }

    req.schedule = schedule;

    return next();
  });

  app.param('week', function(req, res, next, week) {
    var isValidWeek = validateWeek(req.schedule || req.params.schedule, week);

    if(!isValidWeek) {
      return res
        .status(400)
        .json({
          code: 2222,
          message: 'Invalid week parameter [ ' + week + ' ]. ' + 'Week must be valid for the schedule.'
        })
        ;
    }

    req.week = week;

    return next();
  });

  function validateSeason(season) {
    var num = parseInt(season, 10);

    // Only have schedules back to 2002 on ESPN.com

    return !isNaN(season) && isFinite(season) && num >= 2002 && num <= utils.getCurrentSeason();
  }

  function validateSchedule(schedule) {
    var num = parseInt(schedule, 10);

    // PRESEASON=1, REGULAR=2, POST=3

    return !isNaN(schedule) && isFinite(schedule) && num >= 1 && num <= 3;
  }

  function validateWeek(sched, week) {
    var num = parseInt(week, 10);
    var schedule = parseInt(sched, 10);

    if(isNaN(week) || !isFinite(week) || num < 1 || num > 17) {
      return false;
    }

    // Number of valid weeks are determined by schedule (PRE=~5,REG=17,POST=4)

    switch(schedule) {
      case 1:
        return num <= 5;
      case 2:
        return num <= 17;
      case 3:
        return num <= 5;
      default:
        return false;
    }
  }
};
