import React from '../src/zak-react';
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
    render(rootNode, <span></span>);
    assert.equal(rootNode.firstChild.nodeName, 'SPAN');
  });

  it('should have cleared pre-initial-render elements', function() {
    const rootNode = document.getElementById('root');
    render(rootNode, <span></span>);
    assert.equal(rootNode.children.length, 1);
  });

  it('should turn props into DOM Node properties', function() {
    const rootNode = document.getElementById('root');
    render(rootNode, <span className="base"></span>);
    assert.strictEqual(rootNode.firstChild.className, 'base');
  });

  it('should render element with text', function() {
    const rootNode = document.getElementById('root');
    render(rootNode, <span>some text<p/></span>);
    assert.strictEqual(rootNode.firstChild.childNodes.length, 2);
    assert.strictEqual(rootNode.firstChild.childNodes[0].wholeText, 'some text');
    assert.strictEqual(rootNode.firstChild.childNodes[1].nodeName, 'P');
  });

  it('should not rerender an element of same type', function() {
    const rootNode = document.getElementById('root');
    render(rootNode, <span></span>);
    const spanNode1 = rootNode.firstChild;
    render(rootNode, <span></span>);
    const spanNode2 = rootNode.firstChild;
    assert.strictEqual(spanNode1, spanNode2);
  });

  it('should correctly modify props when not rerendering', function() {
    const rootNode = document.getElementById('root');
    render(rootNode, <span a={1} b={2}></span>);
    assert.strictEqual(rootNode.firstChild.b, 2);
    render(rootNode, <span a={3} c={4}></span>);
    assert.strictEqual(rootNode.firstChild.a, 3);
    assert.strictEqual(rootNode.firstChild.b, undefined);
    assert.strictEqual(rootNode.firstChild.c, 4);
  });

  it('should render children', function() {
    const rootNode = document.getElementById('root');
    render(rootNode, <span><p /></span>);
    assert.strictEqual(rootNode.firstChild.nodeName, 'SPAN');
    assert.strictEqual(rootNode.firstChild.firstChild.nodeName, 'P');
  });
});
