import Config from '../Config';
import Logger from '../lib/Logger';

const store = (Config.get('ENVIRONMENT') === 'production')
  ? require('./store.prod.js').default
  : require('./store.dev.js').default;

export default store;

Logger.log('silly', `state.store loaded.`);
