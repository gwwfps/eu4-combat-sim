import {h1, div, button, span} from '../lib/dom.js';
import {compToEl} from '../lib/utils.js';
import {Sides} from '../constants.js';

import ArmySide from './ArmySide.js';
import SimulationSetup from './SimulationSetup.js';
import SimulationActions from '../actions/SimulationActions.js';

const React = require('react');


export default React.createClass({
  render() {
    return div(
      span({ className: 'u-pull-right' },
        button({ className: 'button-primary', onClick: this._onClickRun }, 'Run')
      ),
      h1('EU4 Combat Simulator'),
      div({ className: 'row' },
        compToEl(SimulationSetup)
      ),
      div({ className: 'row' },
        compToEl(ArmySide, { side: Sides.ATTACKERS }),
        compToEl(ArmySide, { side: Sides.DEFENDERS })
      )
    );
  },

  _onClickRun() {
    SimulationActions.startSimulation();
  }
});
