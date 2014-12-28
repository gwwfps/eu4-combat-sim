import {gfSubform, gfRow, gfField} from '../lib/gridforms.js';
import {compToEl} from '../lib/utils.js';

import TroopCountInput from './TroopCountInput.js';

var React = require('react');


export default React.createClass({
  render() {
    return gfSubform('Composition',
      gfRow(
        gfField('Infantry',
          compToEl(TroopCountInput)
        ),
        gfField('Calvary',
          compToEl(TroopCountInput)
        ),
        gfField('Artillery',
          compToEl(TroopCountInput)
        )
      )
    );
  }
});
