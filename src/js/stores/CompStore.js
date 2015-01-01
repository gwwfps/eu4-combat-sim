import {ActionTypes, Sides} from '../constants.js';
import dispatcher from '../dispatcher.js';
import ChangeEmitter from '../lib/ChangeEmitter.js';

const _ = require('lodash');


class CompStore extends ChangeEmitter {
  constructor() {
    this.sides = {};
    this.sides[Sides.ATTACKERS] = {};
    this.sides[Sides.DEFENDERS] = {};
  }

  getSide(side) {
    return _.map(this.sides[side], (count, name) => {
      return { count, name };
    });
  }

  addUnit(unit) {
    const side = this.sides[unit.side];
    if (!side.hasOwnProperty(unit.name)) {
      side[unit.name] = 0;
    }
    side[unit.name] = side[unit.name] + unit.count;
    if (side[unit.name] <= 0) {
      delete side[unit.name];
    }
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
