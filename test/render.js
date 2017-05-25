import render from '../src/render';
import assert from 'assert';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><div id="root"><p><br></div></html>`);

// following is needed to ensure render can use global document object in node context
global.document = dom.window.document;

describe('render', function() {
  it('should render element', function() {
    const rootNode = document.getElementById('root');
    render(rootNode, { type: 'span' });
    assert.equal(rootNode.firstChild.nodeName, 'SPAN');
  });

  it('should have cleared pre-initial-render elements', function() {
    const rootNode = document.getElementById('root');
    render(rootNode, { type: 'span' });
    assert.equal(rootNode.children.length, 1);
  });
});
