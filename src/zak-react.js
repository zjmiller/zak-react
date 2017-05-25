import createElement from './createElement';
import render from './render';

// This allows the following kinds of import:
// import ZakReact from 'zak-react.js';
// const createElement = ZakReact.createElement;
// const render = ZakReact.render;
export default {
  createElement,
  render,
};

// This allows the following kinds of import:
// import { createElement } from 'zak-react.js';
// import { render } from 'zak-react.js';
// import { createElement, render } from 'zak-react.js';
export {
  createElement,
  render,
};
