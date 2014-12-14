var React = require('react');

export const rcf = React.createFactory.bind(React);

export const compToEl = (ComponentClass, attributes) => {
  return rcf(ComponentClass)(attributes || {});
};
