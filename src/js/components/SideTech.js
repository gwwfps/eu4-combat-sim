import {div, fieldset, legend, input, label} from '../utils/dom.js';

var React = require('react');


export default React.createClass({
  render() {
    return fieldset(
      legend('Tech'),
      div({ 'data-row-span': 3 }, 
        div({ 'data-field-span': 1 },
          label('Infantry type'),
          input({ 'type': 'text' })
        ),
        div({ 'data-field-span': 1 },
          label('Calvary type'),
          input({ 'type': 'text' })
        ),
        div({ 'data-field-span': 1 },
          label('Artillery type'),
          input({ 'type': 'text' })
        )
      )
    );
  }
});
