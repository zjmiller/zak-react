export default function render(domNode, element) {
  const renderedDOMNode = document.createElement(element.type);
  domNode.innerHTML = '';
  domNode.appendChild(renderedDOMNode);
}
