var Dispatcher = require('flux').Dispatcher;
($traceurRuntime.createClass)(Dispatcher, Dispatcher.prototype, {});

class AppDispatcher extends Dispatcher {
}

export default const dispatcher = new AppDispatcher();
