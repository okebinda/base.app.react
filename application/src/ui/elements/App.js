/**
 * Base React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux'
import {ThemeProvider} from 'react-native-elements';

import Logger from '../../lib/Logger';
import store from '../../state/store';
import Theme from './styles/Theme';
import AppContainer from './navigators/AppContainer';
import NavigationService from './navigators/NavigationService';

import '../../lib/Localization';
import './utils/NavSession';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <StatusBar barStyle="dark-content" />
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </ThemeProvider>
    </Provider>
  );
};

export default App;

Logger.log('silly', `App loaded.`);
