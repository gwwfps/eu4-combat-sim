import {button, input, select, option} from '../lib/dom.js';
import {gfRow, gfField} from '../lib/gridforms.js';

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
      return input({ valueLink: this.linkState(stateField), className: 'pip', type: 'number', min: 0, max: 6 });
    };

    const unitTypeOptions = _.values(UnitTypes).map((unitType) => {
      return option(unitType.substring(0, 1) + unitType.substring(1, 3).toLowerCase() + '.');
    });

    return gfRow(12,
      gfField(2,
        select({ valueLink: this.linkState('type') }, ...unitTypeOptions)
      ),
      gfField(1, pipInput('offFire')),
      gfField(1, pipInput('defFire')),
      gfField(1, pipInput('offShock')),
      gfField(1, pipInput('defShock')),
      gfField(1, pipInput('offMorale')),
      gfField(1, pipInput('defMorale')),
      gfField(2,
        input({ valueLink: this.linkState('count'), type: 'number', min: 0, max: 1000000, step: 1000 })
      ),
      gfField(2,
        button({ onClick: this._onClick },
          'Add'
        )
      )
    );
  },

  _onClick() {
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
