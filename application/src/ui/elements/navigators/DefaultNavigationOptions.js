/**
 * Default Navigation Options
 */

import React from 'react';
import {Button} from 'react-native-elements';

import Theme from '../styles/Theme';


const defaultNavigationOptions = ({navigation}) => {
  return {
    headerStyle: {
      backgroundColor: Theme.header.colors.background,
    },
    headerTintColor: Theme.header.colors.text,
    headerRight: (
      <Button
        onPress={() => {
          navigation.toggleDrawer();
        }}
        icon={{
          name: "menu",
          type: 'simple-line-icon',
          size: 20,
          color: Theme.header.colors.text
        }}
        style={{text: {color: Theme.header.colors.text}}}
      />
    )
  }
};

export default defaultNavigationOptions;
