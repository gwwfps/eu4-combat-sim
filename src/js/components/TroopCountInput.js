import {input} from '../utils/dom.js';
var React = require('react');

export default React.createClass({
  render() {
    return input({
      'type': 'number',
      min: 0,
      max: 1000000,
      step: 1000
    });
  }
});
