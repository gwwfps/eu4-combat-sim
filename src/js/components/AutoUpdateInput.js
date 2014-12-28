import {input} from '../lib/dom.js';

var React = require('react');
var _ = require('lodash');


export default React.createClass({  
  render() {
    return input(_.extend(_.omit(this.props, 'onChange'), {
      onChange: this._onChange
    }));
  },
  _onChange(evt) {
    // Action.update field: this.props.field   
  }
});

