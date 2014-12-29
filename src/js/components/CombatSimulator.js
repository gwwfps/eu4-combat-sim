import {h1, div} from '../lib/dom.js';
import {compToEl} from '../lib/utils.js';

import ArmySide from './ArmySide.js';
import SimulationSetup from './SimulationSetup.js';

var React = require('react');


export default React.createClass({
  render() {
    return div(
      h1('EU4 Combat Simulator'),
      div({ className: 'row' },
        compToEl(SimulationSetup)
      ),
      div({ className: 'row' },
        compToEl(ArmySide, { sideName: 'Attackers', sideClass: 'attackers' }),
        compToEl(ArmySide, { sideName: 'Defenders', sideClass: 'defenders' })
      )
    );
  }
});
