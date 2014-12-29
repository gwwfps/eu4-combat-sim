import {input} from '../lib/dom.js';

var React = require('react/addons');
var _ = require('lodash');


export default React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState() {
    return {
      value: ''
    };
  },
  render() {
    return input(_.extend({}, this.props, { valueLink: this.linkState('value') }));
  },
  _onChange(evt) {
    // Action.update field: this.props.field   
  }
});

