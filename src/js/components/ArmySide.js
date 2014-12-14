import {h4, div} from '../utils/dom.js';
import {compToEl} from '../utils/helpers.js';

import SideTech from './SideTech.js';
import SideComp from './SideComp.js';

var React = require('react');


export default React.createClass({
  render() {
    return div({ className: 'one-half column' },
      h4(this.props.sideName),
      div({ className: 'grid-form' },
        compToEl(SideTech),
        compToEl(SideComp)
      )
    );
  }
});
