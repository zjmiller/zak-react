const prevRenders = new Map();

export default function render(domNode, element) {
  if (prevRenders.has(domNode)) {
    const queue = [[element, prevRenders.get(domNode), domNode.firstChild, domNode]];
    while (queue.length > 0) {
      const curPoint = queue.shift();
      const curElement = curPoint[0];
      const prevElement = curPoint[1];
      const curDOMNode = curPoint[2];
      const curParent = curPoint[3];

      // node to get rid of
      if (curElement === undefined) {
        curDOMNode.remove();
        continue;
      }

      // no prev node to diff w/
      if (prevElement === undefined) {
        const renderedDOMNode = turnIntoDOMNode(curElement);
        curParent.innerHTML = '';
        curParent.appendChild(renderedDOMNode);
      }

      // prev node to diff w/
      if (prevElement && curElement.type !== prevElement.type) {
        // if types differ just rerender everything
        const renderedDOMNode = turnIntoDOMNode(curElement);
        curParent.innerHTML = '';
        curParent.appendChild(renderedDOMNode);
      } else {
        const curElementPropNames = Object.keys(curElement.props);
        const prevElementPropNames = Object.keys(prevElement.props);

        // add or replace current props
        curElementPropNames.forEach(propName => {
          if (prevElementPropNames.indexOf(propName) > -1) {
            if (curElement.props[propName] !== prevElement.props[propName]) {
              curDOMNode[propName] = curElement.props[propName];
            }
          } else {
            curDOMNode[propName] = curElement.props[propName];
          }
        });

        // make sure all old props are deleted if not included in current props
        prevElementPropNames.forEach(propName => {
          if (curElementPropNames.indexOf(propName) === -1) delete curDOMNode[propName];
        });

        // add children to add to queue
        let j = 0;
        curElement.props.children && curElement.props.children.forEach((child, i) => {
          queue.shift([child, prevElement.children[i], curDOMNode.childNodes[i], curParent]);
          j++;
        });

        // add children to take away to queue
        if (prevElement.props.children && prevElement.props.children.length > j) {
          for (let i = j; j < prevElement.props.children.length; j++) {
            queue.shift([undefined, prevElement.children[j], curDOMNode.childNodes[j], curParent]);
          }
        }
      }
    }
  } else {
    // if first time rendering into DOM node, don't diff
    const renderedDOMNode = turnIntoDOMNode(element);
    domNode.innerHTML = '';
    domNode.appendChild(renderedDOMNode);
  };

  prevRenders.set(domNode, element);
}

function turnIntoDOMNode(element) {
  if (typeof element === 'string') return document.createTextNode(element);

  const domNode = document.createElement(element.type);

  for (let prop in element.props) {
    if (prop !== 'children') domNode[prop] = element.props[prop];
  }

  let children = element.props.children;
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const childDOMNode = turnIntoDOMNode(children[i]);
      domNode.appendChild(childDOMNode);
    }
  }

  return domNode;
}
