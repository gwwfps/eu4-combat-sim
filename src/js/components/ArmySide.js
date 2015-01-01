import {h4, div, input} from '../lib/dom.js';
import {compToEl} from '../lib/utils.js';
import {gf, gfSubform, gfRow, gfField} from '../lib/gridforms.js';

import ArmyComp from './ArmyComp.js';

const React = require('react/addons');


export default React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      discipline: 120,
      morale: 5.5,
      tactics: 2.5,
      combatWidth: 50
    };
  },

  _getSideLowerCase() {
    return this.props.side.toLowerCase();
  },

  render() {
    return div({ className: 'one-half column ' + this._getSideLowerCase() },
      gf(
        gfSubform(this._getSideLowerCase(),
          gfRow(
            gfField('Discipline (%)',
              input({ valueLink: this.linkState('discipline'), type: 'number', min: 50, max: 200 })
            ),
            gfField('Morale',
              input({ valueLink: this.linkState('morale'), type: 'number', min: 0.01, max: 15, step: '0.01' })
            ),
            gfField('Mil. Tactics',
              input({ valueLink: this.linkState('tactics'), type: 'number', min: 0.5, max: 3.5, step: '0.25' })
            ),
            gfField('Combat Width',
              input({ valueLink: this.linkState('combatWidth'), type: 'number', min: 15, max: 40 })
            )
          ),
          gfRow(
            gfField('Cavalry support ratio (%)',
              input({ valueLink: this.linkState('cavRatio'), type: 'number', min: 50, max: 100, step: 10 })
            ),
            gfField('Improved flanking range (%)',
              input({ valueLink: this.linkState('improvedFlanking'), type: 'number', min: 0, max: 125, step: 25 })
            )
          ),
          gfRow(
            gfField('Infantry combat ability (%)',
              input({ valueLink: this.linkState('infCombatAbility'), type: 'number', min: 0, max: 100 })
            ),
            gfField('Cavalry combat ability (%)',
              input({ valueLink: this.linkState('cavCombatAbility'), type: 'number', min: 0, max: 100 })
            ),
            gfField('Artillery combat ability (%)',
              input({ valueLink: this.linkState('artCombatAbility'), type: 'number', min: 0, max: 100 })
            )
          ),
          gfRow(
            gfField('Infantry +fire',
              input({ valueLink: this.linkState('infFire'), type: 'number', min: 0, max: 10, step: 0.01 })
            ),
            gfField('Cavalry +fire',
              input({ valueLink: this.linkState('cavFire'), type: 'number', min: 0, max: 10, step: 0.01 })
            ),
            gfField('Artillery +fire',
              input({ valueLink: this.linkState('artFile'), type: 'number', min: 0, max: 10, step: 0.01 })
            )
          ),
          gfRow(
            gfField('Infantry +shock',
              input({ valueLink: this.linkState('infShock'), type: 'number', min: 0, max: 10, step: 0.01 })
            ),
            gfField('Cavalry +shock',
              input({ valueLink: this.linkState('cavShock'), type: 'number', min: 0, max: 10, step: 0.01 })
            ),
            gfField('Artillery +shock',
              input({ valueLink: this.linkState('artShock'), type: 'number', min: 0, max: 10, step: 0.01 })
            )
          )
        ),
        compToEl(ArmyComp, { side: this.props.side })
      )
    );
  }
});
