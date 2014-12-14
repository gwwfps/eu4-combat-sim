import {div, fieldset, legend, label} from '../utils/dom.js';
import {compToEl} from '../utils/helpers.js';

import TroopCountInput from './TroopCountInput.js';

var React = require('react');


export default React.createClass({
  render() {
    return fieldset(
      legend('Composition'),
      div({ 'data-row-span': 3 }, 
        div({ 'data-field-span': 1 },
          label('Infantry'),
          compToEl(TroopCountInput)
        ),
        div({ 'data-field-span': 1 },
          label('Calvary'),
          compToEl(TroopCountInput)
        ),
        div({ 'data-field-span': 1 },
          label('Artillery'),
          compToEl(TroopCountInput)
        )
      )
    );
  }
});
