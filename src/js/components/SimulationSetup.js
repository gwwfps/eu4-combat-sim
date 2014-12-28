import {div, fieldset, legend, input, label} from '../lib/dom.js';
import {compToEl} from '../lib/utils.js';
import AutoUpdateInput from './AutoUpdateInput.js'

var React = require('react');


export default React.createClass({
  render() {
    return div({ className: 'grid-form' },
      fieldset(
        legend('Simulation Setup'),
        div({ 'data-row-span': 5 }, 
          div({ 'data-field-span': 1 },
            label('No. of runs'),
            compToEl(AutoUpdateInput, {
              required: true,
              type: 'number',
              min: 1000,
              max: 100000,
              step: 1000
            })
          )
        )
      )
    );
  }
});
