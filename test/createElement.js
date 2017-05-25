import createElement from '../src/createElement';
import assert from 'assert';

describe('createElement', function() {
  it('should create plain JavaScript object', function() {
    assert.equal(typeof createElement('div'), 'object');
  });
});
