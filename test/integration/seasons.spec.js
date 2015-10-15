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
    seasons: apiVersion + '/seasons',
    schedules: apiVersion + '/schedules',
    seasonSchedules: apiVersion + '/seasons/2015/schedules',
    preseasonWeeks: apiVersion + '/seasons/2015/schedules/1/weeks',
    regularSeasonWeeks: apiVersion + '/seasons/2015/schedules/2/weeks',
    postseasonWeeks: apiVersion + '/seasons/2015/schedules/3/weeks'
  };

  describe(uris.seasons, function() {
    describe('GET', function(done) {
      var server;
      beforeEach(function(done) {
        process.env.BUNYAN_LOGLEVEL = 'OFF';
        process.env.EXPRESS_LOG_FORMAT = 'OFF';

        // Start api server
        server = require('../../app/app');
        done();
      });

      it('should return an array', function(done) {
        supertest(server)
          .get(uris.seasons)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.isArray(result);
            done();
          })
          ;
      });

      it('should return an array with length > 12', function(done) {
        supertest(server)
          .get(uris.seasons)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.isArray(result);
            expect(result).to.have.length.above(12);
            done();
          });
      });

      it('should return an array of integers', function(done) {
        supertest(server)
          .get(uris.seasons)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.isArray(result);
            _.each(result, function(item) {
              assert.isNumber(item);
            });
            done();
          });
      });
    });
  });

  describe(uris.schedules, function() {
    describe('GET', function(done) {
      var server;
      beforeEach(function(done) {
        process.env.BUNYAN_LOGLEVEL = 'OFF';
        process.env.EXPRESS_LOG_FORMAT = 'OFF';

        // Start api server
        server = require('../../app/app');
        done();
      });

      it('should return an array', function(done) {
        supertest(server)
          .get(uris.schedules)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.isArray(result);
            done();
          });
      });

      it('should return an array with length 3', function(done) {
        supertest(server)
          .get(uris.schedules)
          .end(function(err, res) {
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

  describe(uris.seasonSchedules, function() {
    describe('GET', function(done) {
      var server;
      beforeEach(function(done) {
        process.env.BUNYAN_LOGLEVEL = 'OFF';
        process.env.EXPRESS_LOG_FORMAT = 'OFF';

        // Start api server
        server = require('../../app/app');
        done();
      });

      it('should return an array', function(done) {
        supertest(server)
          .get(uris.seasonSchedules)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.isArray(result);
            done();
          });
      });

      it('should return an array with length 3', function(done) {
        supertest(server)
          .get(uris.seasonSchedules)
          .end(function(err, res) {
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

  describe(uris.preseasonWeeks, function() {
    describe('GET', function(done) {
      var server;
      beforeEach(function(done) {
        process.env.BUNYAN_LOGLEVEL = 'OFF';
        process.env.EXPRESS_LOG_FORMAT = 'OFF';

        // Start api server
        server = require('../../app/app');
        done();
      });

      it('should return an array with length 5', function(done) {
        supertest(server)
          .get(uris.preseasonWeeks)
          .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.isArray(result);
            expect(result).to.have.length(5);
            done();
          })
          ;
      });
    });
  });

  describe(uris.regularSeasonWeeks, function() {
    describe('GET', function(done) {
      var server;
      beforeEach(function(done) {
        process.env.BUNYAN_LOGLEVEL = 'OFF';
        process.env.EXPRESS_LOG_FORMAT = 'OFF';

        // Start api server
        server = require('../../app/app');
        done();
      });

      it('should return an array with length 5', function(done) {
        supertest(server)
          .get(uris.regularSeasonWeeks)
          .end(function(err, res) {
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

  describe(uris.postseasonWeeks, function() {
    describe('GET', function(done) {
      var server;
      beforeEach(function(done) {
        process.env.BUNYAN_LOGLEVEL = 'OFF';
        process.env.EXPRESS_LOG_FORMAT = 'OFF';

        // Start api server
        server = require('../../app/app');
        done();
      });

      it('should return an array with length 5', function(done) {
        supertest(server)
          .get(uris.postseasonWeeks)
          .end(function(err, res) {
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
