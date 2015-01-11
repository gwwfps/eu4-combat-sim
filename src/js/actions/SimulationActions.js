import {ActionTypes} from '../constants.js';
import dispatcher from '../dispatcher.js';


export default {
  updateSetupFields(fields) {
    dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_SETUP_FIELDS,
      fields: fields
    });
  },

  updateSideFields(side, fields) {
    dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_SIDE_FIELDS,
      side: side,
      fields: fields
    });
  },

  startSimulation() {
    dispatcher.dispatch({
      actionType: ActionTypes.START_SIMULATION
    })
  }
}
