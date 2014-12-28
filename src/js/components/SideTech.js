import {div, fieldset, legend, input, label} from '../lib/dom.js';

var React = require('react');


export default React.createClass({
  render() {
    return fieldset(
      legend('Tech'),
      div({ 'data-row-span': 4 }, 
        div({ 'data-field-span': 1 },
          label('Discipline'),
          input({ 'type': 'text' })        
        ),
        div({ 'data-field-span': 1 },
          label('Morale'),
          input({ 'type': 'text' })
        ),
        div({ 'data-field-span': 1 },
          label('Tactics'),
          input({ 'type': 'text' })
        ),
        div({ 'data-field-span': 1 },
          label('Combat Width'),
          input({ 'type': 'text' })
        )
      ),
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
