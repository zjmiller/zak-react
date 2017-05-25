import createElement from '../src/createElement';
import assert from 'assert';

describe('createElement', function() {
  it('should create plain JavaScript object', function() {
    assert.strictEqual(typeof createElement('div'), 'object');
  });

  it('should include empty props even if no props passed', function() {
    const elem = createElement('div');
    assert.strictEqual(typeof elem.props, 'object');
    assert.strictEqual(Object.keys(elem.props).length, 0);
  });

  it('should include correct props if props passed', function() {
    const props = { className: 'base' };
    const elem = createElement('div' , props);
    assert.deepStrictEqual(elem.props, { className: 'base' });
  });

  it('should have undefined children prop if no children', function() {
    const elem = createElement('div');
    assert.strictEqual(elem.props.children, undefined);
  });

  it('should include child', function() {
    const child = { type: 'span' };
    const elem = createElement('div' , {}, child);
    assert.deepStrictEqual(elem.props.children, [{ type: 'span' }]);
  });

  it('should include children', function() {
    const child1 = { type: 'span' };
    const child2 = { type: 'p' };
    const elem = createElement('div' , {}, child1, child2);
    assert.deepStrictEqual(elem.props.children, [{ type: 'span' }, { type: 'p' }]);
  });
});
