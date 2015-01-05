import {ActionTypes, Sides} from '../constants.js';
import {serializeToLocalStorage, deserializeFromLocalStorage} from '../lib/utils.js';
import dispatcher from '../dispatcher.js';
import ChangeEmitter from '../lib/ChangeEmitter.js';

const _ = require('lodash');


const _defaultSetup = () => {
  return {
    numOfRuns: 1000,
    terrainPenalty: 0,
    combatWidthModifier: 0,
    riverCrossing: false
  };
};

const _defaultSide = () => {
  return {
    discipline: 100,
    morale: 3.5,
    tactics: 2.5,
    combatWidth: 20,
    cavRatio: 50,
    improvedFlanking: 0,
    infCombatAbility: 0,
    cavCombatAbility: 0,
    artCombatAbility: 0,
    infFire: 0,
    cavFire: 0,
    artFile: 0,
    infShock: 0,
    cavShock: 0,
    artShock: 0,
    genFire: 0,
    genShock: 0
  };
};

const _defaultSides = () => {
  var sides = {};
  sides[Sides.ATTACKERS] = _defaultSide();
  sides[Sides.DEFENDERS] = _defaultSide();
  return sides;
};

class SimulationStore extends ChangeEmitter {
  constructor() {
    this.setup = deserializeFromLocalStorage('setup') || _defaultSetup();
    this.sides = deserializeFromLocalStorage('sides') || _defaultSides();
  }

  getSetupFields() {
    return _.extend({}, this.setup);
  }

  updateSetupFields(fields) {
    _.extend(this.setup, fields);
    serializeToLocalStorage('setup', this.setup);
  }

  getSideFields(side) {
    return _.extend({}, this.sides[side]);
  }

  updateSideFields(side, fields) {
    _.extend(this.sides[side], fields);
    serializeToLocalStorage('sides', this.sides);
  }
}

const instance = new SimulationStore();
export default instance;

instance.dispatchToken = dispatcher.register((payload) => {
  switch(payload.actionType) {
    case ActionTypes.UPDATE_SETUP_FIELDS:
      instance.updateSetupFields(payload.fields);
      break;
    case ActionTypes.UPDATE_SIDE_FIELDS:
      instance.updateSideFields(payload.side, payload.fields);
      break;
  }

  return true;
});
