var expect = require('chai').expect;
var assert = require('chai').assert;

var url = require('url');
var superagent = require('superagent');
var status = require('http-status');
var _ = require('lodash');

(function() {
  'use strict';

  var apiVersion = '/' + (process.env.API_VERSION || 'v1');

  var uri = {
    protocol: (process.env.PROTOCOL || 'http'),
    hostname: (process.env.HOST || 'localhost'),
    port: (process.env.PORT || 4101)
  };

  var uris = {
    seasonsIdScheduleWeek: url.format(_.assign(uri, {pathname: apiVersion + '/seasons/2015/schedules/2/weeks/5'}))
  };

  describe(apiVersion + '/seasons/:year/:schedule/:week', function() {
    describe('GET', function(done) {
      it('should return an object', function(done) {
        superagent.get(uris.seasonsIdScheduleWeek).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.OK);
          var result = JSON.parse(res.text);
          assert.isObject(result);
          done();
        });
      });

      it('should return a proper schedule object', function(done) {
        superagent.get(uris.seasonsIdScheduleWeek).end(function(err, res) {
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
        });
      });

      it('should return all 32 teams', function(done) {
        superagent.get(uris.seasonsIdScheduleWeek).end(function(err, res) {
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
        });
      });
    });
  });
})();
