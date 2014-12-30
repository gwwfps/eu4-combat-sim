import {div, fieldset, legend, label} from './dom.js'
import {shiftProps} from './utils.js';

const _ = require('lodash');


// gridforms shorthands
export const gf = (...args) => {
  return div({ className: 'grid-form' }, ...args);
};

export const gfSubform = (...rows) => {
  const props = shiftProps(rows);

  if (rows.length && _.isString(rows[0])) {
    rows[0] = legend(rows[0]);
  }

  return fieldset(props, ...rows);
};

export const gfRow = (...fields) => {
  const props = shiftProps(fields);

  var total;
  if (fields.length && _.isNumber(fields[0])) {
    total = fields.shift();
  } else {
    total = _.chain(fields).map((field) => {
      return field.props['data-field-span'];
    }).reduce((sum, span) => {
      return sum + span;
    }).value();
  }

  props['data-row-span'] = total;

  return div(props, ...fields);
};

export const gfField = (...children) => {
  const props = shiftProps(children);

  var span = 1;
  if (children.length && _.isNumber(children[0])) {
    span = children.shift();
  }
  
  if (children.length && _.isString(children[0])) {
    children[0] = label(children[0]);
  }

  props['data-field-span'] = span;

  return div(props, ...children);
};
