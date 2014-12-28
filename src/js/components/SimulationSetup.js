import {gf, gfSubform, gfRow, gfField} from '../lib/gridforms.js';
import {compToEl} from '../lib/utils.js';
import AutoUpdateInput from './AutoUpdateInput.js'

var React = require('react');


export default React.createClass({
  render() {
    return gf(
      gfSubform('Simulation Setup',
        gfRow(
          gfField('No. of runs',
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
