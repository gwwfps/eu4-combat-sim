import {gf, gfSubform, gfRow, gfField} from '../lib/gridforms.js';
import {compToEl} from '../lib/utils.js';
import AutoUpdateInput from './AutoUpdateInput.js'

const React = require('react');


export default React.createClass({
  render() {
    return gf(
      gfSubform('Simulation Setup',
        gfRow(5,
          gfField('No. of runs',
            compToEl(AutoUpdateInput, {
              required: true,
              type: 'number',
              min: 1000,
              max: 100000,
              step: 1000
            })
          ),
          gfField('Terrain'),
          gfField('River crossing')
        )
      )
    );
  }
});
