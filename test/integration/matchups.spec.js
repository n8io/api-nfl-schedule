var expect = require('chai').expect;
var assert = require('chai').assert;

var url = require('url');
var supertest = require('supertest');
var status = require('http-status');
var _ = require('lodash');

(function() {
  'use strict';

  var apiVersion = '/' + (process.env.API_VERSION || 'v1');

  var uris = {
    preseasonScheduleMatchups: apiVersion + '/seasons/2015/schedules/1/weeks/1/matchups',
    regularScheduleMatchups: apiVersion + '/seasons/2015/schedules/2/weeks/4/matchups',
    postseasonScheduleMatchups: apiVersion + '/seasons/2002/schedules/3/weeks/1/matchups',
    badSeasonMatchups: apiVersion + '/seasons/9999/schedules/2/weeks/1/matchups',
    badScheduleMatchups: apiVersion + '/seasons/2015/schedules/9999/weeks/1/matchups',
    badWeekMatchups: apiVersion + '/seasons/2015/schedules/2/weeks/9999/matchups'
  };

  describe(uris.badSeasonMatchups, function() {
    describe('GET', function(done) {
      var server;
      beforeEach(function(done) {
        process.env.BUNYAN_LOGLEVEL = 'OFF';
        process.env.EXPRESS_LOG_FORMAT = 'OFF';

        // Start api server
        server = require('../../app/app');
        done();
      });

      it('should return a 400 for an invalid season parameter', function(done) {
        supertest(server)
          .get(uris.badSeasonMatchups)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.BAD_REQUEST);
            var result = JSON.parse(res.text);
            assert.isObject(result);
            assert.property(result, 'code');
            assert.equal(result.code, 4444);
            done();
          })
          ;
      });
    });
  });

  describe(uris.badScheduleMatchups, function() {
    describe('GET', function(done) {
      var server;
      beforeEach(function(done) {
        process.env.BUNYAN_LOGLEVEL = 'OFF';
        process.env.EXPRESS_LOG_FORMAT = 'OFF';

        // Start api server
        server = require('../../app/app');
        done();
      });

      it('should return a 400 for an invalid schedule parameter', function(done) {
        supertest(server)
          .get(uris.badScheduleMatchups)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.BAD_REQUEST);
            var result = JSON.parse(res.text);
            assert.isObject(result);
            assert.property(result, 'code');
            assert.equal(result.code, 3333);
            done();
          })
          ;
      });
    });
  });

  describe(uris.badWeekMatchups, function() {
    describe('GET', function(done) {
      var server;
      beforeEach(function(done) {
        process.env.BUNYAN_LOGLEVEL = 'OFF';
        process.env.EXPRESS_LOG_FORMAT = 'OFF';

        // Start api server
        server = require('../../app/app');
        done();
      });

      it('should return a 400 for an invalid week parameter', function(done) {
        supertest(server)
          .get(uris.badWeekMatchups)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.BAD_REQUEST);
            var result = JSON.parse(res.text);
            assert.isObject(result);
            assert.property(result, 'code');
            assert.equal(result.code, 2222);
            done();
          })
          ;
      });
    });
  });

  describe(uris.regularScheduleMatchups, function() {
    describe('GET', function(done) {
      var server;
      beforeEach(function(done) {
        process.env.BUNYAN_LOGLEVEL = 'OFF';
        process.env.EXPRESS_LOG_FORMAT = 'OFF';

        // Start api server
        server = require('../../app/app');
        done();
      });

      it('should return an object', function(done) {
        supertest(server)
          .get(uris.regularScheduleMatchups)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.isObject(result);
            done();
          })
          ;
      });

      it('should return a schedule object', function(done) {
        supertest(server)
          .get(uris.regularScheduleMatchups)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.property(result, 'isFinal');
            assert.isBoolean(result.isFinal);
            assert.property(result, 'matchups');
            assert.isArray(result.matchups);
            assert.property(result, 'byes');
            assert.isArray(result.byes);
            done();
          })
          ;
      });

      it('should return a schedule object with 2 team(s) on BYE', function(done) {
        supertest(server)
          .get(uris.regularScheduleMatchups)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.property(result, 'byes');
            assert.isArray(result.byes);
            expect(result.byes).to.have.length(2);
            done();
          })
          ;
      });

      it('should return a schedule object with 15 matchup(s)', function(done) {
        supertest(server)
          .get(uris.regularScheduleMatchups)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.property(result, 'matchups');
            assert.isArray(result.matchups);
            expect(result.matchups).to.have.length(15);
            done();
          })
          ;
      });

      it('should return 32 team(s)', function(done) {
        supertest(server)
          .get(uris.regularScheduleMatchups)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            var teams = [];
            var byeTeams = result.byes;
            var homeTeams = _.map(result.matchups, function(m) {
              return m.homeTeam;
            });
            var awayTeams = _.map(result.matchups, function(m) {
              return m.awayTeam;
            });

            teams = _.union(byeTeams, homeTeams, awayTeams);

            expect(teams).to.have.length(32);

            done();
          })
          ;
      });
    });
  });

  describe(uris.postseasonScheduleMatchups, function() {
    describe('GET', function(done) {
      var server;
      beforeEach(function(done) {
        process.env.BUNYAN_LOGLEVEL = 'OFF';
        process.env.EXPRESS_LOG_FORMAT = 'OFF';

        // Start api server
        server = require('../../app/app');
        done();
      });

      it('should return an object', function(done) {
        supertest(server)
          .get(uris.postseasonScheduleMatchups)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.isObject(result);
            done();
          })
          ;
      });

      it('should return a schedule object', function(done) {
        supertest(server)
          .get(uris.postseasonScheduleMatchups)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.property(result, 'isFinal');
            assert.isBoolean(result.isFinal);
            assert.property(result, 'matchups');
            assert.isArray(result.matchups);
            assert.property(result, 'byes');
            assert.isArray(result.byes);
            done();
          })
          ;
      });

      it('should return a schedule object with 0 team(s) on BYE', function(done) {
        supertest(server)
          .get(uris.postseasonScheduleMatchups)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.property(result, 'byes');
            assert.isArray(result.byes);
            expect(result.byes).to.have.length(0);
            done();
          })
          ;
      });

      it('should return a schedule object with 4 matchup(s)', function(done) {
        supertest(server)
          .get(uris.postseasonScheduleMatchups)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.property(result, 'matchups');
            assert.isArray(result.matchups);
            expect(result.matchups).to.have.length(4);
            done();
          })
          ;
      });

      it('should return 8 team(s)', function(done) {
        supertest(server)
          .get(uris.postseasonScheduleMatchups)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            var teams = [];
            var byeTeams = result.byes;
            var homeTeams = _.map(result.matchups, function(m) {
              return m.homeTeam;
            });
            var awayTeams = _.map(result.matchups, function(m) {
              return m.awayTeam;
            });

            teams = _.union(byeTeams, homeTeams, awayTeams);

            expect(teams).to.have.length(8);

            done();
          })
          ;
      });
    });
  });
})();
