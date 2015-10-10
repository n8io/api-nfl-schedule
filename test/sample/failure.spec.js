var expect = require('chai').expect;

(function() {
  'use strict';

  describe('Server', function() {
    describe.skip('Subtraction', function() {
      var sum = 1 - 1;

      it('should subtract two numbers correctly', function() {
        expect(sum).to.equal(1);
      });
    });
  });
})();
