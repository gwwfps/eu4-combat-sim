import {h4, div, input} from '../lib/dom.js';
import {compToEl} from '../lib/utils.js';
import {gf, gfSubform, gfRow, gfField} from '../lib/gridforms.js';

import ArmyComp from './ArmyComp.js';
import SimulationActions from '../actions/SimulationActions.js';
import SimulationStore from '../stores/SimulationStore.js';

const React = require('react/addons');
const _ = require('lodash');


const _getStateFromStore = (side) => {
  return SimulationStore.getSideFields(side);
};

export default React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return _getStateFromStore(this.props.side);
  },

  _getSideLowerCase() {
    return this.props.side.toLowerCase();
  },

  _linkedField(name, additionalProps) {
    return input(_.extend({ valueLink: this.linkState(name), type: 'number' }, additionalProps || {}));
  },

  render() {
    return div({ className: 'one-half column ' + this._getSideLowerCase() },
      gf(
        gfSubform(this._getSideLowerCase(),
          gfRow(
            gfField('Discipline (%)',
              this._linkedField('discipline', { min: 50, max: 200 })
            ),
            gfField('Morale',
              this._linkedField('morale', { min: 0.01, max: 15, step: '0.01' })
            ),
            gfField('Mil. Tactics',
              this._linkedField('tactics', { min: 0.5, max: 3.5, step: '0.25' })
            ),
            gfField('Combat Width',
              this._linkedField('combatWidth', { min: 15, max: 40 })
            )
          ),
          gfRow(
            gfField('Cavalry support ratio (%)',
              this._linkedField('cavRatio', { min: 50, max: 100, step: 10 })
            ),
            gfField('Improved flanking range (%)',
              this._linkedField('improvedFlanking', { min: 0, max: 125, step: 25 })
            )
          ),
          gfRow(
            gfField('Infantry combat ability (%)',
              this._linkedField('infCombatAbility', { min: 0, max: 100 })
            ),
            gfField('Cavalry combat ability (%)',
              this._linkedField('cavCombatAbility', { min: 0, max: 100 })
            ),
            gfField('Artillery combat ability (%)',
              this._linkedField('artCombatAbility', { min: 0, max: 100 })
            )
          ),
          gfRow(
            gfField('Infantry +fire',
              this._linkedField('infFire', { min: 0, max: 10, step: 0.01 })
            ),
            gfField('Cavalry +fire',
              this._linkedField('cavFire', { min: 0, max: 10, step: 0.01 })
            ),
            gfField('Artillery +fire',
              this._linkedField('artFile', { min: 0, max: 10, step: 0.01 })
            )
          ),
          gfRow(
            gfField('Infantry +shock',
              this._linkedField('infShock', { min: 0, max: 10, step: 0.01 })
            ),
            gfField('Cavalry +shock',
              this._linkedField('cavShock', { min: 0, max: 10, step: 0.01 })
            ),
            gfField('Artillery +shock',
              this._linkedField('artShock', { min: 0, max: 10, step: 0.01 })
            )
          ),
          gfRow(
            gfField('General Fire',
              this._linkedField('genFire', { min: 0, max: 6 })
            ),
            gfField('General Shock',
              this._linkedField('genShock', { min: 0, max: 6 })
            )
          )
        ),
        compToEl(ArmyComp, { side: this.props.side })
      )
    );
  },

  componentWillUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      SimulationActions.updateSideFields(nextProps.side, nextState);
    }
  }
});
