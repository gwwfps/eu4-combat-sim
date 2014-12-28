import {h4, div, fieldset, legend, input, label} from './lib/dom.js';
import {compToEl} from './lib/utils.js';

import CombatSimulator from './components/CombatSimulator.js';

var React = require('react');


React.render(compToEl(CombatSimulator), document.getElementById('main'));
