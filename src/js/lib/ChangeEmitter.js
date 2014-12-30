import {shimClass} from '../lib/utils.js';

const EventEmitter = shimClass(require('events').EventEmitter);


const CHANGE_EVENT = 'change';

export default class ChangeEmitter extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
   
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}
