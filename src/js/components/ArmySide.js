import {h4, div, input} from '../lib/dom.js';
import {compToEl} from '../lib/utils.js';
import {gf, gfSubform, gfRow, gfField} from '../lib/gridforms.js';

import ArmyComp from './ArmyComp.js';

const React = require('react');


export default React.createClass({
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
            gfField('Tech group',
              input({ 'type': 'text' })        
            ),
            gfField('Calvary support ratio',
              input({ 'type': 'text' })
            )
          ),
          gfRow( 
            gfField('Discipline (%)',
              input({ 'type': 'text' })        
            ),
            gfField('Morale',
              input({ 'type': 'text' })
            ),
            gfField('Tactics',
              input({ 'type': 'text' })
            ),
            gfField('Combat Width',
              input({ 'type': 'text' })
            )
          ),
          gfRow(
            gfField('Infantry combat ability (%)',
              input({ 'type': 'text' })
            ),
            gfField('Calvary combat ability (%)',
              input({ 'type': 'text' })
            ),
            gfField('Artillery combat ability (%)',
              input({ 'type': 'text' })
            )
          )
        ),
        compToEl(ArmyComp, { side: this.props.side })
      )
    );
  }
});
