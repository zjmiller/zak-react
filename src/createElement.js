function createElement(type, props) {
  // the following excludes children prop from props in created element
  if (props && props.children !== undefined && props.children !== null) {
    delete props.children;
  }

  return {
    type,
    props,
  };
}

export default createElement;
