import {div, span, label, abbr} from '../lib/dom.js';
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

    const pipLabel = (name) => {
      const initials = name.split(' ').map((word) => {
        return word[0];
      }).join('');
      return label(abbr({ title: `${name} pips` }, initials));
    };

    return div({ className: 'comp' },
      gfSubform('Composition',
        gfRow(12,
          gfField(2, 'Type'),
          gfField(1, pipLabel('Offensive Fire')),
          gfField(1, pipLabel('Defensive Fire')),
          gfField(1, pipLabel('Offensive Shock')),
          gfField(1, pipLabel('Defensive Shock')),
          gfField(1, pipLabel('Offensive Morale')),
          gfField(1, pipLabel('Defensive Morale')),
          gfField(2, 'Count'),
          gfField(2, '')
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
