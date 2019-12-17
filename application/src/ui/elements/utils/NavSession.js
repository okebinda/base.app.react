/**
 * Navigation Session Event Handlers
 */

import store from '../../../state/store';
import {sessionDestroy} from '../../../state/actions';
import Events from '../../../lib/EventEmitter';
import Auth from '../../../lib/Auth';
import NavigationService from '../navigators/NavigationService';


Events.subscribe('NAVIGATION_WILL_FOCUS', (payload) => {
  if (payload.state && payload.state.params && payload.state.params.protected) {
    const state = store.getState();
    const authToken = state.session.get('authToken');
    const authExpires = state.session.get('authExpires');
    if (!Auth.isAuthTokenValid(authToken, authExpires)) {
      store.dispatch(sessionDestroy());
      Events.dispatch('SESSION_DESTROY');
    }
  }
});

Events.subscribe('SESSION_DESTROY', () => {
  NavigationService.navigate('Auth');
});
