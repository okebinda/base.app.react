import Logger from './Logger';

class EventEmitter {

  constructor() {
    Logger.log('silly', `EventEmitter.constructor()`);
    this.events = {};
  }

  dispatch(event, data) {
    Logger.log('silly', `EventEmitter.dispatch(###, ###)`, event, data);
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }

  subscribe(event, callback) {
    Logger.log('silly', `EventEmitter.subscribe(###, ###)`, event);
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }
}

const Events = new EventEmitter();
export default Events;

Logger.log('silly', `EventEmitter loaded.`);
