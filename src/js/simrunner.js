import {RunnerResultTypes} from './constants.js';
import Battle from './simulation/Battle.js';

onmessage = (evt) => {
  try {
    const battle = new Battle(evt.data);
    postMessage({
      type: RunnerResultTypes.SUCCESS,
      result: battle.resolve()
    });
  } catch (e) {
    postMessage({
      type: RunnerResultTypes.ERROR,
      message: e.message
    });
  }
};
