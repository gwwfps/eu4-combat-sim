import {gf, gfSubform, gfRow, gfField} from '../lib/gridforms.js';
import {input} from '../lib/dom.js';
import {compToEl} from '../lib/utils.js';

import SimulationActions from '../actions/SimulationActions.js';
import SimulationStore from '../stores/SimulationStore.js';

const React = require('react/addons');


const _getStateFromStore = () => {
  return SimulationStore.getSetupFields();
};

export default React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return _getStateFromStore();
  },

  render() {
    return gf(
      gfSubform('Simulation Setup',
        gfRow(
          gfField('No. of runs',
            input({ valueLink: this.linkState('numOfRuns'), type: 'number', min: 1000, max: 100000, step: 1000 })
          ),
          gfField('Terrain penalty',
            input({ valueLink: this.linkState('terrainPenalty'), type: 'number', min: -6, max: 0 })
          ),
          gfField('Terrain combat width (%)',
            input({ valueLink: this.linkState('combatWidthModifier'), type: 'number', min: -50, max: 0, step: 5 })
          ),
          gfField('River crossing',
            input({ checkedLink: this.linkState('riverCrossing'), type: 'checkbox' })
          )
        )
      )
    );
  },

  componentWillUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      SimulationActions.updateSetupFields(nextState);
    }
  }
});
