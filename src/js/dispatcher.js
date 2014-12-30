import {shimClass} from './lib/utils.js';

const Dispatcher = shimClass(require('flux').Dispatcher);


class AppDispatcher extends Dispatcher {
}

export default new AppDispatcher();
