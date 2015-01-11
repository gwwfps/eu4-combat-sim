import {ActionTypes, Sides} from '../constants.js';
import {serializeToLocalStorage, deserializeFromLocalStorage} from '../lib/utils.js';
import dispatcher from '../dispatcher.js';
import ChangeEmitter from '../lib/ChangeEmitter.js';

const _ = require('lodash');


const _unitCache = deserializeFromLocalStorage('_unitCache') || {};

class CompStore extends ChangeEmitter {
  constructor() {
    this.sides = deserializeFromLocalStorage('compSides');
    if (!this.sides) {
      this.sides = {};
      this.sides[Sides.ATTACKERS] = {};
      this.sides[Sides.DEFENDERS] = {};
    }
  }

  getSide(side) {
    return _.map(this.sides[side], (count, unitKey) => {
      return _.extend({}, _unitCache[unitKey], { count, key: unitKey });
    });
  }

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

    serializeToLocalStorage('compSides', this.sides);
  }

  removeUnit(unit) {
    const side = this.sides[unit.side];
    const unitKey = this._cacheUnit(unit);
    delete side[unitKey];
  }

  _cacheUnit(unit) {
    const realUnit = _.pick(unit, ['type', 'offFire', 'defFire', 'offShock', 'defShock', 'offMorale', 'defMorale']);
    const unitKey = _.values(realUnit).join('-');
    _unitCache[unitKey] = realUnit;
    serializeToLocalStorage('_unitCache', _unitCache);
    return unitKey;
  }
}

const instance = new CompStore();
export default instance;

instance.dispatchToken = dispatcher.register((payload) => {
  switch(payload.actionType) {
    case ActionTypes.COMP_ADD_UNIT:
      instance.addUnit(payload.unit);
      instance.emitChange();
      break;

    case ActionTypes.COMP_REMOVE_UNIT:
      instance.removeUnit(payload.unit);
      instance.emitChange();
      break;
  }

  return true;
});
