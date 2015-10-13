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
    seasons: url.format(_.assign(uri, {pathname: apiVersion + '/seasons'})),
    schedules: url.format(_.assign(uri, {pathname: apiVersion + '/schedules'})),
    seasonsId: url.format(_.assign(uri, {pathname: apiVersion + '/seasons/404'})),
    seasonsIdSchedule: url.format(_.assign(uri, {pathname: apiVersion + '/seasons/2015/schedules'})),
    preseasonWeeks: url.format(_.assign(uri, {pathname: apiVersion + '/seasons/2015/schedules/1/weeks'})),
    regularSeasonWeeks: url.format(_.assign(uri, {pathname: apiVersion + '/seasons/2015/schedules/2/weeks'})),
    postseasonWeeks: url.format(_.assign(uri, {pathname: apiVersion + '/seasons/2015/schedules/3/weeks'})),
    seasonsIdScheduleIdWeekId: url.format(_.assign(uri, {pathname: apiVersion + '/seasons/2015/schedules/1/weeks/1'}))
  };

  describe(apiVersion + '/seasons', function() {
    describe('GET', function(done) {
      it('should return an array', function(done) {
        superagent.get(uris.seasons).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.OK);
          var result = JSON.parse(res.text);
          assert.isArray(result);
          done();
        });
      });

      it('should return an array with length > 12', function(done) {
        superagent.get(uris.seasons).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.OK);
          var result = JSON.parse(res.text);
          expect(result).to.have.length.above(12);
          done();
        });
      });

      it('should return an array of integers', function(done) {
        superagent.get(uris.seasons).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.OK);
          var result = JSON.parse(res.text);
          _.each(result, function(item) {
            assert.isNumber(item);
          });
          done();
        });
      });
    });
  });

  describe(apiVersion + '/schedules', function() {
    describe('GET', function(done) {
      it('should return an array', function(done) {
        superagent.get(uris.schedules).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.OK);
          var result = JSON.parse(res.text);
          assert.isArray(result);
          done();
        });
      });

      it('should return an array with length 3', function(done) {
        superagent.get(uris.schedules).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.OK);
          var result = JSON.parse(res.text);
          expect(result).to.have.length(3);
          done();
        });
      });
    });
  });

  describe(apiVersion + '/seasons/:season', function() {
    describe('GET', function(done) {
      it('should return a 404 Not Found', function(done) {
        superagent.get(uris.seasonsId).end(function(err, res) {
          assert.equal(res.status, status.NOT_FOUND);
          done();
        });
      });
    });
  });

  describe(apiVersion + '/seasons/:season/schedules', function() {
    describe('GET', function(done) {
      it('should return an array', function(done) {
        superagent.get(uris.seasonsIdSchedule).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.OK);
          var result = JSON.parse(res.text);
          assert.isArray(result);
          expect(result).to.have.length(3);
          done();
        });
      });
    });
  });

  describe(apiVersion + '/seasons/:season/schedules/1/weeks', function() {
    describe('GET', function(done) {
      it('should return an array with length 5', function(done) {
        superagent.get(uris.preseasonWeeks).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.OK);
          var result = JSON.parse(res.text);
          assert.isArray(result);
          expect(result).to.have.length(5);
          done();
        });
      });
    });
  });

  describe(apiVersion + '/seasons/:season/schedules/2/weeks', function() {
    describe('GET', function(done) {
      it('should return an array with length 5', function(done) {
        superagent.get(uris.regularSeasonWeeks).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.OK);
          var result = JSON.parse(res.text);
          assert.isArray(result);
          expect(result).to.have.length(17);
          done();
        });
      });
    });
  });

  describe(apiVersion + '/seasons/:season/schedules/3/weeks', function() {
    describe('GET', function(done) {
      it('should return an array with length 5', function(done) {
        superagent.get(uris.postseasonWeeks).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.OK);
          var result = JSON.parse(res.text);
          assert.isArray(result);
          expect(result).to.have.length(5);
          done();
        });
      });
    });
  });
})();
