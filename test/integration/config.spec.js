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
    config: url.format(_.assign(uri, {pathname: '/config'})),
    debug: url.format(_.assign(uri, {pathname: '/debug'})),
    diagnostics: url.format(_.assign(uri, {pathname: '/diagnostics'}))
  };

  describe('/config', function() {
    describe('GET', function(done) {
      it('should return a 404 Not Found', function(done) {
        superagent.get(uris.config).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.NOT_FOUND);
          done();
        });
      });
    });
  });

  describe('/debug', function() {
    describe('GET', function(done) {
      it('should return a 404 Not Found', function(done) {
        superagent.get(uris.debug).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.NOT_FOUND);
          done();
        });
      });
    });
  });

  describe('/diagnostics', function() {
    describe('GET', function(done) {
      it('should return a 404 Not Found', function(done) {
        superagent.get(uris.diagnostics).end(function(err, res) {
          assert.ifError(err);
          assert.equal(res.status, status.NOT_FOUND);
          done();
        });
      });
    });
  });
})();
