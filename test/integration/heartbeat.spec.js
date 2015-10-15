var expect = require('chai').expect;
var assert = require('chai').assert;

var url = require('url');
var supertest = require('supertest');
var status = require('http-status');
var _ = require('lodash');

(function() {
  'use strict';

  var uris = {
    root: '/',
    heartbeat: '/heartbeat'
  };

  describe(uris.root, function() {
    describe('GET', function(done) {
      var server;
      beforeEach(function(done) {
        process.env.BUNYAN_LOGLEVEL = 'OFF';
        process.env.EXPRESS_LOG_FORMAT = 'OFF';

        // Start api server
        server = require('../../app/app');
        done();
      });

      it('should return a 200 OK', function(done) {
        supertest(server)
          .get(uris.root).end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            done();
          });
      });
    });
  });

  describe(uris.heartbeat, function() {
    describe('GET', function(done) {
      var server;
      beforeEach(function(done) {
        process.env.BUNYAN_LOGLEVEL = 'OFF';
        process.env.EXPRESS_LOG_FORMAT = 'OFF';

        // Start api server
        server = require('../../app/app');
        done();
      });

      it('should return a 200 OK', function(done) {
        supertest(server)
          .get(uris.heartbeat).end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            done();
          });
      });
    });
  });
})();
