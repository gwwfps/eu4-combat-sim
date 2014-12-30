import {div, span} from '../lib/dom.js';
import {gfSubform, gfRow, gfField} from '../lib/gridforms.js';
import {compToEl} from '../lib/utils.js';

import CompStore from '../stores/CompStore.js';
import ArmyCompAddUnit from './ArmyCompAddUnit.js';

const React = require('react');


export default React.createClass({
  _getStateFromStore() {
    return {
      troops: CompStore.getSide(this.props.side)
    };
  },

  getInitialState() {
    return this._getStateFromStore();
  },

  render() {
    const troops = this.state.troops.map((unit) => {
      return gfRow({ key: unit.name }, 5,
        gfField(3, span(unit.name)),
        gfField(1, unit.count),
        gfField(1)
      );
    });

    return div({ className: 'comp' },
      gfSubform('Composition',
        gfRow(5,
          gfField(3, 'Type'),
          gfField(1, 'Count'),
          gfField(1, 'Add/remove')
        ),
        troops.length ? troops : gfRow(gfField(span('Add troops below to compose army...'))),
        compToEl(ArmyCompAddUnit, { side: this.props.side }),
        gfRow(
          gfField('Infantry'),
          gfField('Calvary'),
          gfField('Artillery'),
          gfField('Grand total')
        )
      )
    );
  },

  componentDidMount() {
    CompStore.addChangeListener(this._onChange);    
  },

  componentWillUnmount() {
    CompStore.removeChangeListener(this._onChange);    
  },

  _onChange() {
    this.setState(this._getStateFromStore());
  }
});
