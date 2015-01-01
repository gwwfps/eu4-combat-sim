import {ActionTypes} from '../constants.js';
import dispatcher from '../dispatcher.js';
import ChangeEmitter from '../lib/ChangeEmitter.js';

const _ = require('lodash');


class GameDataStore extends ChangeEmitter {
  constructor() {
    
  }

  receiveTechGroups() {

  }
}

const instance = new GameDataStore();
export default instance;

instance.dispatchToken = dispatcher.register((payload) => {
  switch(payload.actionType) {
    case ActionTypes.RECEIVE_TECH_GROUPS:
      instance.emitChange();
      break;
  }

  return true;
});
