import {h4, div} from '../lib/dom.js';
import {compToEl} from '../lib/utils.js';
import {gf} from '../lib/gridforms.js';

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
    return div({ className: 'one-half column' },
      h4(this.props.sideName),
      gf(
        compToEl(SideTech),
        compToEl(SideComp)
      )
    );
  }
});
