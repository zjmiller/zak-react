const flatten = require('lodash.flatten');

function createElement(type, passedProps) {
  let props = passedProps || {};
  let children = [].slice.call(arguments, 2);

  const hasChildren = children.length > 0;
  if (hasChildren) {
    // the following flattens children single level deep
    children = flatten(children);

    // the following adds the children as a prop
    props = Object.assign(
      {},
      props,
      { children }
    );
  }

  return {
    type,
    props,
  };
}

export default createElement;
