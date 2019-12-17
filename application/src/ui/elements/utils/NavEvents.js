import React from 'react';
import {NavigationEvents} from 'react-navigation';

import Events from '../../../lib/EventEmitter';


const NavEvents = () => (
  <NavigationEvents
    onWillFocus={payload => Events.dispatch('NAVIGATION_WILL_FOCUS', payload)}
    onDidFocus={payload => Events.dispatch('NAVIGATION_DID_FOCUS', payload)}
    onWillBlur={payload => Events.dispatch('NAVIGATION_WILL_BLUR', payload)}
    onDidBlur={payload => Events.dispatch('NAVIGATION_DID_BLUR', payload)}
  />
);

export default NavEvents;
