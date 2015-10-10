var expect = require('chai').expect;

(function() {
  'use strict';

  describe('Server', function() {
    describe('Addition', function() {
      var sum = 1 + 2;

      it('should add two numbers correctly', function() {
        expect(sum).to.equal(3);
      });
    });
  });
})();
