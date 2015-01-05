import {h4, div, fieldset, legend, input, label} from './lib/dom.js';
import {compToEl} from './lib/utils.js';
import {VERSION} from './constants.js';

import CombatSimulator from './components/CombatSimulator.js';

const React = require('react');


if (localStorage.getItem('VERSION') !== VERSION) {
  localStorage.clear();
  localStorage.setItem('VERSION', VERSION);
}

React.render(compToEl(CombatSimulator), document.getElementById('main'));
