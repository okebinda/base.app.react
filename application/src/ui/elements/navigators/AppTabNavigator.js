/**
 * Application Tab Routes
 */

import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Theme from '../styles/Theme';
import defaultNavigationOptions from './DefaultNavigationOptions';
import Temp1Screen from '../modules/_temp/components/Temp1Screen';
import Temp2Screen from '../modules/_temp/components/Temp2Screen';
import Temp3Screen from '../modules/_temp/components/Temp3Screen';


const Screen1StackNavigator = createStackNavigator(
  {
    Temp1: {screen: Temp1Screen, params: {protected: true}}
  },
  {
    initialRouteName: "Temp1",
    defaultNavigationOptions: defaultNavigationOptions
  }
);

const Screen2StackNavigator = createStackNavigator(
  {
    Temp2: {screen: Temp2Screen, params: {protected: true}},
  },
  {
    initialRouteName: "Temp2",
    defaultNavigationOptions: defaultNavigationOptions
  }
);

const AppTabNavigator = createBottomTabNavigator(
  {
    "Tab 1": Screen1StackNavigator,
    "Tab 2": Screen2StackNavigator,
  },
  {
    initialRouteName: "Tab 1",
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = FontAwesome;
        let iconName;
        if (routeName === "Tab 1") {
          iconName = `home`;
        } else if (routeName === "Tab 2") {
          iconName = `list`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: Theme.tabs.colors.activeTint,
      inactiveTintColor: Theme.tabs.colors.inactiveTint,
      style: {
        backgroundColor: Theme.tabs.colors.background
      }
    },
  }
);

export default AppTabNavigator;
