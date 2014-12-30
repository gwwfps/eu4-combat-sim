import {ActionTypes} from '../constants.js';
import dispatcher from '../dispatcher.js';


export default {
  addUnit(unit) {
   dispatcher.dispatch({
     actionType: ActionTypes.COMP_ADD_UNIT,
     unit: unit
   });
  }
}
