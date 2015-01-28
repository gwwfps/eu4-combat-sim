import {Sides} from '../constants.js';
import {serializeToLocalStorage, deserializeFromLocalStorage} from '../lib/utils.js';
import CompActions from '../actions/CompActions.js';

const _ = require('lodash');
const Reflux = require('reflux');


const _unitCache = deserializeFromLocalStorage('_unitCache') || {};

export default Reflux.createStore({
  init() {
    this.sides = deserializeFromLocalStorage('compSides');
    if (!this.sides) {
      this.sides = {};
      this.sides[Sides.ATTACKERS] = {};
      this.sides[Sides.DEFENDERS] = {};
    }

    this.listenTo(CompActions.addUnit, this.addUnit);
    this.listenTo(CompActions.removeUnit, this.removeUnit);
  },

  getSide(side) {
    return _.map(this.sides[side], (count, unitKey) => {
      return _.extend({}, _unitCache[unitKey], { count, key: unitKey });
    });
  },

  addUnit(unit) {
    const side = this.sides[unit.side];

    const unitKey = this._cacheUnit(unit);

    if (!side.hasOwnProperty(unitKey)) {
      side[unitKey] = 0;
    }
    side[unitKey] = side[unitKey] + unit.count;
    if (side[unitKey] <= 0) {
      delete side[unitKey];
    }

    this._saveAndTrigger();
  },

  removeUnit(unit) {
    const side = this.sides[unit.side];
    const unitKey = this._cacheUnit(unit);
    delete side[unitKey];

    this._saveAndTrigger();
  },

  _saveAndTrigger() {
    serializeToLocalStorage('compSides', this.sides);
    this.trigger();
  },

  _cacheUnit(unit) {
    const realUnit = _.pick(unit, ['type', 'offFire', 'defFire', 'offShock', 'defShock', 'offMorale', 'defMorale']);
    const unitKey = _.values(realUnit).join('-');
    _unitCache[unitKey] = realUnit;
    serializeToLocalStorage('_unitCache', _unitCache);
    return unitKey;
  }
});
