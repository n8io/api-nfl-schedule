var expect = require('chai').expect;
var assert = require('chai').assert;

var url = require('url');
var supertest = require('supertest');
var status = require('http-status');
var _ = require('lodash');

(function() {
  'use strict';

  var uris = {
    config: '/config'
  };

  describe(uris.config, function() {
    describe('GET', function(done) {
      var server;
      beforeEach(function(done) {
        process.env.ADMIN_KEY = 'goodkey';
        process.env.BUNYAN_LOGLEVEL = 'OFF';
        process.env.EXPRESS_LOG_FORMAT = 'OFF';

        // Start api server
        server = require('../../app/app');
        done();
      });

      it('should return a 404 Not Found without a valid ADMIN_KEY', function(done) {
        supertest(server)
          .get(uris.config + '?accessKey=badkey')
          .expect(404)
          .end(function(err, res) {
            assert.ifError(err);
            done();
          })
          ;
      });

      it('should return an object with a valid ADMIN_KEY', function(done) {
        supertest(server)
          .get(uris.config + '?accessKey=' + process.env.ADMIN_KEY)
          .expect(200)
          .end(function(err, res) {
            assert.ifError(err);
            done();
          })
          ;
      });
    });
  });
})();
