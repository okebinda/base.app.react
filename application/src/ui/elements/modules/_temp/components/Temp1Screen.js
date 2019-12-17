import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, withTheme} from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';

import Events from '../../../../../lib/EventEmitter';
import NavEvents from '../../../utils/NavEvents';


class Temp1Screen extends Component {

  static navigationOptions = {
    title: 'Screen 1',
  };

  render() {
    const {theme} = this.props;
    return (
      <>
        <NavEvents />
        <View style={{flex: 1}}>
          <View style={{margin: 40}}>
            <Text>Screen 1</Text>
          </View>
        </View>
      </>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Events.dispatch('MOUNT_COMPONENT', {'name': 'Temp1Screen'});
  }

  componentWillUnmount() {
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'Temp1Screen'});
  }
}

export default withTheme(Temp1Screen);
