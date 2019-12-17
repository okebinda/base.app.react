import React, {Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import Auth from '../../../../../lib/Auth';
import Events from '../../../../../lib/EventEmitter';


export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let isAuthorized = false;
    const sessionData = await Auth.getSession();
    const authToken = sessionData.authToken;
    const authExpires = sessionData.authExpires;

    // check if auth token has exipred
    if (Auth.isAuthTokenValid(authToken, authExpires)) {
      isAuthorized = true;
      this.props.sessionHydrate(sessionData);
    }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(isAuthorized ? 'App' : 'Auth');
    // RNBootSplash.hide({ duration: 250 });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator
          size='large'
          color="#333333"
          animating={true}
        />
      </View>
    );
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Events.dispatch('MOUNT_COMPONENT', {'name': 'AuthLoadingScreen'});
  }

  componentWillUnmount() {
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'AuthLoadingScreen'});
  }
}
