const _ = require('lodash');
const React = require('react');


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

export const shimClass = (cls) => {
  ($traceurRuntime.createClass)(cls, cls.prototype, {});
  return cls;
};

export const capitalize = (text, lowerAll = true) => {
  if (lowerAll) {
    text = text.toLowerCase();
  }
  return text[0].toUpperCase() + text.substring(1);
};

export const abbreviate = (text, length = 3) => {
  return text.length > length ? (text.substring(0, 3) + '.') : text;
};
