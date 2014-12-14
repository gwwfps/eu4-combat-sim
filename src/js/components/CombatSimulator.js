import {div} from '../utils/dom.js';
import {compToEl} from '../utils/helpers.js';

import ArmySide from './ArmySide.js';

var React = require('react');


export default React.createClass({
  render() {
    return div({ className: 'row' },
      compToEl(ArmySide, { sideName: 'Attackers' }),
      compToEl(ArmySide, { sideName: 'Defenders' })
    );
  }
});
