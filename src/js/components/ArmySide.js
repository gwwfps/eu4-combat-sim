import {h4, div} from '../lib/dom.js';
import {compToEl} from '../lib/utils.js';

import SideTech from './SideTech.js';
import SideComp from './SideComp.js';

var React = require('react');


export default React.createClass({
  getInitialState() {
    return {
      discipline: 120,
      morale: 5.5,
      tactics: 2.5,
      combatWidth: 50
    };
  },
  render() {
    return div({ className: 'one-half column well' },
      h4(this.props.sideName),
      div({ className: 'grid-form' },
        compToEl(SideTech),
        compToEl(SideComp)
      )
    );
  }
});
