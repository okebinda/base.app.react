/**
 * Application Drawer Routes
 */

import React from 'react';
import {Dimensions} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import defaultNavigationOptions from './DefaultNavigationOptions';
import AppTabNavigator from './AppTabNavigator';
import UserAccountScreen from '../modules/userAccount/containers/UserAccountScreenContainer';
import UpdatePasswordScreen from '../modules/userAccount/components/UpdatePasswordScreen';
import MainMenu from '../menus/containers/MainMenuContainer';


const AppStackNavigator = createStackNavigator(
  {
    Screens: {
      screen: AppTabNavigator,
      navigationOptions: { header: null }
    },
    UserAccount: {screen: UserAccountScreen, params: {protected: true}},
    UpdatePassword: {screen: UpdatePasswordScreen, params: {protected: true}}
  },
  {
    initialRouteName: "Screens",
    defaultNavigationOptions: defaultNavigationOptions
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    AppStack: AppStackNavigator
  },
  {
    contentComponent: MainMenu,
    drawerWidth: Dimensions.get('window').width <= 320 ? 250 : 300,
    drawerPosition: 'right',
    drawerType: 'front',
  }
);

export default AppDrawerNavigator;
