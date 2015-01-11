import {div, span, label, abbr, button} from '../lib/dom.js';
import {gfSubform, gfRow, gfField} from '../lib/gridforms.js';
import {compToEl, abbreviate, capitalize} from '../lib/utils.js';

import {UnitTypes} from '../constants.js';
import CompActions from '../actions/CompActions.js';
import CompStore from '../stores/CompStore.js';
import ArmyCompAddUnit from './ArmyCompAddUnit.js';

const React = require('react');
const _ = require('lodash');


export default React.createClass({
  _getStateFromStore() {
    return {
      troops: CompStore.getSide(this.props.side)
    };
  },

  getInitialState() {
    return this._getStateFromStore();
  },

  _sumTroopTotal(type) {
    var troops = this.state.troops;
    if (type) {
      troops = _.filter(troops, { type });
    }

    if (!troops.length) {
      return 0;
    }

    return _.reduce(_.pluck(troops, 'count'), (sum, num) => { return sum + num; });
  },

  render() {
    const troops = this.state.troops.map((unit) => {
      return gfRow({ key: unit.key }, 12,
        gfField(2, span(capitalize(abbreviate(unit.type)))),
        gfField(1, unit.offFire),
        gfField(1, unit.defFire),
        gfField(1, unit.offShock),
        gfField(1, unit.defShock),
        gfField(1, unit.offMorale),
        gfField(1, unit.defMorale),
        gfField(2, unit.count),
        gfField(1, button({ onClick: _.bind(this._onClickRemove, this, unit) }, 'X'))
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
          gfField(2)
        ),
        troops.length ? troops : gfRow(gfField(span('Add troops below to compose army...'))),
        compToEl(ArmyCompAddUnit, { side: this.props.side }),
        gfRow(
          gfField(UnitTypes.INFANTRY, this._sumTroopTotal(UnitTypes.INFANTRY)),
          gfField(UnitTypes.CAVALRY, this._sumTroopTotal(UnitTypes.CAVALRY)),
          gfField(UnitTypes.ARTILLERY, this._sumTroopTotal(UnitTypes.ARTILLERY)),
          gfField('Total', this._sumTroopTotal())
        )
      )
    );
  },

  _onClickRemove(unit) {
    CompActions.removeUnit(_.extend({}, unit, { side: this.props.side }));
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
