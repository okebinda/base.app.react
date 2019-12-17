import {Map} from 'immutable';

const Config = Map({
  ENVIRONMENT: 'development', // production, development, test
  API_BASE_URL: 'http://base.api.python.vm/v/dev',
  API_APP_KEY: '7sv3aPS45Ck8URGRKUtBdMWgKFN4ahfW',
  LOG_LEVEL: 'silly', // error, warn, info, verbose, debug, silly

  DEFAULT_LOGIN_REDIRECT: 'Temp1', // routing key for screen to redirect user to after successful authentication
  
  MODULE_TOGGLES: Map({
    'session': {'enabled': true, 'routes': true},
    'userAccount': {'enabled': true, 'routes': true},
    'register': {'enabled': true, 'routes': true}
  })
});

export default Config;
