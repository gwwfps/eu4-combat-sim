import {input} from '../lib/dom.js';

const React = require('react/addons');
const _ = require('lodash');


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

