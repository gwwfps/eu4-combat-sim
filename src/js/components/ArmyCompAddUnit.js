import {button, input, select, option, span} from '../lib/dom.js';
import {gfRow, gfField} from '../lib/gridforms.js';
import {capitalize, abbreviate} from '../lib/utils.js';

import {UnitTypes} from '../constants.js';
import CompActions from '../actions/CompActions.js';

const React = require('react/addons');
const _ = require('lodash');


export default React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      type: UnitTypes.INFANTRY,
      offFire: 0,
      defFire: 0,
      offShock: 1,
      defShock: 1,
      offMorale: 1,
      defMorale: 1,
      count: 1000
    };
  },

  render() {
    const pipInput = (stateField) => {
      return gfField({ onClick: _.bind(this._onClickPip, this, stateField), className: 'pip' }, 1,
        span(this.state[stateField])
      );
    };

    const unitTypeOptions = _.values(UnitTypes).map((unitType) => {
      return option({ value: unitType }, capitalize(abbreviate(unitType)));
    });

    return gfRow(12,
      gfField(2,
        select({ valueLink: this.linkState('type') }, ...unitTypeOptions)
      ),
      pipInput('offFire'),
      pipInput('defFire'),
      pipInput('offShock'),
      pipInput('defShock'),
      pipInput('offMorale'),
      pipInput('defMorale'),
      gfField(2,
        input({ valueLink: this.linkState('count'), type: 'number', min: 0, max: 1000000, step: 1000 })
      ),
      gfField(2,
        button({ onClick: this._onClickAdd },
          'Add'
        )
      )
    );
  },

  _onClickPip(stateField) {
    const toUpdate = {};
    var newPip = this.state[stateField] + 1;
    if (newPip > 6) {
      newPip = 0;
    }
    toUpdate[stateField] = newPip;
    this.setState(toUpdate);
  },

  _onClickAdd() {
    const count = parseInt(this.state.count, 10);
    if (_.isNaN(count)) {
      return;
    }

    CompActions.addUnit(_.extend({}, this.state, {
      count,
      side: this.props.side
    }))
  }
});
