import createElement from '../src/createElement';
import assert from 'assert';

describe('createElement', function() {
  it('should create plain JavaScript object', function() {
    assert.equal(typeof createElement('div'), 'object');
  });

  it('should include props', function() {
    const props = { className: 'base' };
    const elem = createElement('div' , props);
    assert.deepEqual(elem.props, { className: 'base' });
  });

  it('should exclude children prop from props', function() {
    const props = { className: 'base', children: { type: 'span' } };
    const elem = createElement('div' , props);
    assert.deepEqual(elem.props, { className: 'base' });
  });
});
