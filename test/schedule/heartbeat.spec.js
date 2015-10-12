var expect = require('chai').expect;
var assert = require('chai').assert;

var url = require('url');
var superagent = require('superagent');
var status = require('http-status');
var _ = require('lodash');

(function() {
  'use strict';

  var uri = {
    protocol: (process.env.PROTOCOL || 'http'),
    hostname: (process.env.HOST || 'localhost'),
    port: (process.env.PORT || 4101)
  };

  var uris = {
    root: url.format(_.assign(uri, {pathname: '/'})),
    heartbeat: url.format(_.assign(uri, {pathname: '/heartbeat'}))
  };

  describe('/', function() {
    describe('GET', function(done) {
      it('should return a 200 OK', function(done) {
        superagent.get(uris.root).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.OK);
          done();
        });
      });
    });
  });

  describe('/heartbeat', function() {
    describe('GET', function(done) {
      it('should return a 200 OK', function(done) {
        superagent.get(uris.heartbeat).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.OK);
          done();
        });
      });
    });
  });
})();
