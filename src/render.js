export default function render(domNode, element) {
  const renderedDOMNode = turnIntoDOMNode(element);
  domNode.innerHTML = '';
  domNode.appendChild(renderedDOMNode);
}

function turnIntoDOMNode(element) {
  if (typeof element === 'string') return document.createTextNode(element);

  const domNode = document.createElement(element.type);

  if (element.children) {
    for (let i = 0; i < element.children.length; i++) {
      const childDOMNode = turnIntoDOMNode(element.children[i]);
      domNode.appendChild(childDOMNode);
    }
  }

  return domNode;
}
