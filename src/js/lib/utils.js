var _ = require('lodash');
var React = require('react');


export const shiftProps = (args) => {
  var props = {};
  if (args.length && _.isPlainObject(args[0])) {
    props = args.shift();
  }
  return props;
};

export const compToEl = (ComponentClass, ...children) => {
  var props = shiftProps(children);
  return React.createElement(ComponentClass, props || {}, ...children);
};
