import render from '../src/render';
import createElement from '../src/createElement';
import assert from 'assert';
import { JSDOM } from 'jsdom';

beforeEach(function(){
  const dom = new JSDOM(`<!DOCTYPE html><div id="root"><p><br></div></html>`);
  // following is needed to ensure render can use global document object in node context
  global.document = dom.window.document;
});

describe('render', function() {
  it('should render element', function() {
    const rootNode = document.getElementById('root');
    render(rootNode, { type: 'span', props: {} });
    assert.equal(rootNode.firstChild.nodeName, 'SPAN');
  });

  it('should have cleared pre-initial-render elements', function() {
    const rootNode = document.getElementById('root');
    render(rootNode, { type: 'span', props: {} });
    assert.equal(rootNode.children.length, 1);
  });

  it('should turn props into DOM Node properties', function() {
    const rootNode = document.getElementById('root');
    render(rootNode, { type: 'span', props: { className: 'base' } });
    assert.strictEqual(rootNode.firstChild.className, 'base');
  });

  it('should render element with text', function() {
    const rootNode = document.getElementById('root');
    render(rootNode, { type: 'span', props: { children: ['some text', { type: 'p', props: {} }] } });
    assert.strictEqual(rootNode.firstChild.childNodes.length, 2);
    assert.strictEqual(rootNode.firstChild.childNodes[0].wholeText, 'some text');
    assert.strictEqual(rootNode.firstChild.childNodes[1].nodeName, 'P');
  });

  it('should not rerender an element of same type', function() {
    const rootNode = document.getElementById('root');
    render(rootNode, { type: 'span', props: {} });
    const spanNode1 = rootNode.firstChild;
    render(rootNode, { type: 'span', props: {} });
    const spanNode2 = rootNode.firstChild;
    assert.strictEqual(spanNode1, spanNode2);
  });

  it('should correctly modify props when not rerendering', function() {
    const rootNode = document.getElementById('root');
    render(rootNode, { type: 'span', props: {a: 1, b: 2} });
    assert.strictEqual(rootNode.firstChild.b, 2);
    render(rootNode, { type: 'span', props: {a: 3, c: 4} });
    assert.strictEqual(rootNode.firstChild.a, 3);
    assert.strictEqual(rootNode.firstChild.b, undefined);
    assert.strictEqual(rootNode.firstChild.c, 4);
  });
});
