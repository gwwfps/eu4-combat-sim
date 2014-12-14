import {h4, div, fieldset, legend, input, label} from './utils/dom.js';
import {compToEl} from './utils/helpers.js';

import CombatSimulator from './components/CombatSimulator.js';

var React = require('react');


React.render(compToEl(CombatSimulator), document.getElementById('main'));
