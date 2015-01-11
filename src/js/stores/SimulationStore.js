import {ActionTypes, Sides} from '../constants.js';
import {serializeToLocalStorage, deserializeFromLocalStorage} from '../lib/utils.js';
import dispatcher from '../dispatcher.js';
import ChangeEmitter from '../lib/ChangeEmitter.js';

import {MAX_WORKERS, WORKER_SCRIPT, WORKER_TIMEOUT} from '../constants.js';
import CompStore from './CompStore.js';

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

  _parseFields(fields) {
    _.each(fields, (value, key) => {
      if (_.isString(value)) {
        fields[key] = parseFloat(value);
      }
    });
  }

  getSetupFields() {
    return _.extend({}, this.setup);
  }

  updateSetupFields(fields) {
    this._parseFields(_.extend(this.setup, fields));
    serializeToLocalStorage('setup', this.setup);
  }

  getSideFields(side) {
    return _.extend({}, this.sides[side]);
  }

  updateSideFields(side, fields) {
    this._parseFields(_.extend(this.sides[side], fields));
    serializeToLocalStorage('sides', this.sides);
  }

  startSimulation() {
    return new Promise(_.bind((resolve, reject) => {
      var sides = _.cloneDeep(this.sides);
      _.each(sides, (side, name) => {
        return CompStore.getSide(name);
      });

      var results = [];
      const resultHandler = _.bind((evt) => {
        results.push(evt.data);
        if (results.length === this.setup.numOfRuns) {
          resolve(results);
        }
      }, this);

      const workers = _.times(MAX_WORKERS, () => {
        var worker = new Worker(WORKER_SCRIPT);
        worker.onmessage = resultHandler;
        return worker;
      });

      _.times(this.setup.numOfRuns, (i) => {
        workers[i % MAX_WORKERS].postMessage(sides);
      });

      _.delay(() => {
        reject();
      }, WORKER_TIMEOUT);
    }, this));
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
    case ActionTypes.START_SIMULATION:
      instance.startSimulation().then((results) => {
        console.log(results);
      });
      break;
  }

  return true;
});
