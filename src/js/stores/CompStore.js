import {ActionTypes, Sides} from '../constants.js';
import dispatcher from '../dispatcher.js';
import ChangeEmitter from '../lib/ChangeEmitter.js';

const _ = require('lodash');


const unitCache = {};

class CompStore extends ChangeEmitter {
  constructor() {
    this.sides = {};
    this.sides[Sides.ATTACKERS] = {};
    this.sides[Sides.DEFENDERS] = {};
  }

  getSide(side) {
    return _.map(this.sides[side], (count, unitKey) => {
      return _.extend({}, unitCache[unitKey], { count, key: unitKey });
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
  }

  _cacheUnit(unit) {
    const realUnit = _.pick(unit, ['type', 'offFire', 'defFire', 'offShock', 'defShock', 'offMorale', 'defMorale']);
    const unitKey = _.values(realUnit).join('-');
    unitCache[unitKey] = realUnit;
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
  }

  return true;
});
