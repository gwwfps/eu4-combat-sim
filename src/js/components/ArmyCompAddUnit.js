import {button, input, select, option} from '../lib/dom.js';
import {gfRow, gfField} from '../lib/gridforms.js';

import CompActions from '../actions/CompActions.js';

const React = require('react/addons');
const _ = require('lodash');


export default React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      name: 'line_inf',
      count: 1000
    };
  },

  render() {
    return gfRow(5,
      gfField(3,
        select({ valueLink: this.linkState('name') },
          option({ value: 'tercio' }, 'Tercio Infantry'),
          option({ value: 'line_inf' }, 'Line Infantry')
        )
      ),
      gfField(1,
        input({
          'type': 'number',
          min: 0,
          max: 1000000,
          step: 1000,
          valueLink: this.linkState('count')
        })
      ),
      gfField(1,
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

    CompActions.addUnit({
      name: this.state.name,
      count,
      side: this.props.side
    })
  }
});
