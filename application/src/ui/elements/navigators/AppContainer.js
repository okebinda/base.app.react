/**
 * Application Route Container
 */

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AuthLoadingScreen from '../modules/session/containers/AuthLoadingScreenContainer';
import AuthStackNavigator from './AuthStackNavigator';
import AppDrawerNavigator from './AppDrawerNavigator';


const AppSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: AppDrawerNavigator
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default createAppContainer(AppSwitchNavigator);
