import {combineReducers} from 'redux';
import {Map, OrderedMap} from 'immutable';

import {
  ADD_ENTITIES,
  REMOVE_ENTITY,
  SESSION_CREATE_REQUEST,
  SESSION_CREATE_SUCCESS,
  SESSION_CREATE_FAILURE,
  SESSION_FORM_DESTROY,
  SESSION_HYDRATE,
  SESSION_DESTROY,
  PASSWORD_RESET_CODE_REQUEST,
  PASSWORD_RESET_CODE_SUCCESS,
  PASSWORD_RESET_CODE_FAILURE,
  PASSWORD_RESET_CODE_FORM_DESTROY,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE,
  PASSWORD_RESET_FORM_DESTROY
} from './actions';
import Config from '../Config';
import Logger from '../lib/Logger';

const initialEntitiesState = Map({});

export function entities(
  state=initialEntitiesState,
  action
) {
  Logger.log('debug', `[state.reducers] entities(###, ###)`, state, action);

  switch(action.type) {

    case ADD_ENTITIES:
      const tempState = {};
      for (var key in action.payload.entities) {
        tempState[key] = {...state.get(key, {}), ...action.payload.entities[key]};
      }
      return state.merge(tempState);

    case REMOVE_ENTITY:
      return state.deleteIn([action.payload.entityType, action.payload.id]);
    
    case SESSION_DESTROY:
      return initialEntitiesState;

    default:
      return state;
  }
}

const initialSessionState = Map({
  isLoading: false,
  isPasswordResetCodeSubmitting: false,
  isPasswordResetSubmitting: false,
  form: null,
  passwordResetCodeForm: null,
  passwordResetForm: null,
});

export function session(
  state=initialSessionState,
  action
) {
  Logger.log('debug', `[state.reducers] session(###, ###)`, state, action);

  switch(action.type) {

    case SESSION_CREATE_REQUEST:
      return state.mergeDeep({
        isLoading: true,
        form: null
      });

    case SESSION_CREATE_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        form: {
          success: true
        },
        authToken: action.authToken,
        authExpiration: action.authExpiration,
        authExpires: action.authExpires,
        userId: action.userId,
        username: action.username,
        lastUpdated: action.receivedAt
      });

    case SESSION_CREATE_FAILURE:
      return state.mergeDeep({
        isLoading: false,
        form: {
          success: false
        }
      }).setIn(['form', 'errors'], action.error);

    case SESSION_FORM_DESTROY:
        return state.mergeDeep({
          form: null
        }).set('form', action.form);

    case SESSION_HYDRATE:
      return state.mergeDeep({
        authToken: action.authToken,
        authExpiration: action.authExpiration,
        authExpires: action.authExpires,
        userId: action.userId,
        username: action.username
      });
    
    case SESSION_DESTROY:
      return initialSessionState;
    
    case PASSWORD_RESET_CODE_REQUEST:
      return state.mergeDeep({
        isPasswordResetCodeSubmitting: true,
        passwordResetCodeForm: null
      });

    case PASSWORD_RESET_CODE_SUCCESS:
      return state.mergeDeep({
        isPasswordResetCodeSubmitting: false,
        passwordResetCodeForm: {
          success: true
        },
        success: action.success,
        sent: action.sent,
        lastUpdated: action.receivedAt
      });

    case PASSWORD_RESET_CODE_FAILURE:
      return state.mergeDeep({
        isPasswordResetCodeSubmitting: false,
        passwordResetCodeForm: {
          success: false
        }
      }).setIn(['passwordResetCodeForm', 'errors'], action.error);

    case PASSWORD_RESET_CODE_FORM_DESTROY:
      return state.mergeDeep({
        passwordResetCodeForm: null
      }).set('passwordResetCodeForm', action.form);

    case PASSWORD_RESET_REQUEST:
      return state.mergeDeep({
        isPasswordResetSubmitting: true,
        passwordResetForm: null
      });

    case PASSWORD_RESET_SUCCESS:
      return state.mergeDeep({
        isPasswordResetSubmitting: false,
        passwordResetForm: {
          success: true
        },
        success: action.success,
        lastUpdated: action.receivedAt
      });

    case PASSWORD_RESET_FAILURE:
      return state.mergeDeep({
        isPasswordResetSubmitting: false,
        passwordResetForm: {
          success: false
        }
      }).setIn(['passwordResetForm', 'errors'], action.error);

    case PASSWORD_RESET_FORM_DESTROY:
      return state.mergeDeep({
        passwordResetForm: null
      }).set('passwordResetForm', action.form);

    default:
      return state;
  }
}

// register modules
const moduleReducers = {};
if (Config.getIn(['MODULE_TOGGLES', 'register', 'enabled'])) {
  moduleReducers['register'] = require(`./modules/register/reducers.js`).default;
}
if (Config.getIn(['MODULE_TOGGLES', 'userAccount', 'enabled'])) {
  moduleReducers['userAccount'] = require(`./modules/userAccount/reducers.js`).default;
}

const rootReducer = combineReducers({
  session,
  entities,
  ...moduleReducers
});

export default rootReducer;

Logger.log('silly', `state.reducers loaded.`);
