import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, withTheme} from 'react-native-elements';

import Events from '../../../../../lib/EventEmitter';
import NavEvents from '../../../utils/NavEvents';

class Temp2Screen extends Component {

  static navigationOptions = {
    title: 'Screen 2',
  };

  render() {
    const {theme} = this.props;
    return (
      <>
        <NavEvents />
        <View style={{flex: 1}}>
          <View style={{margin: 40}}>
            <Text>Screen 2</Text>
          </View>
        </View>
      </>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Events.dispatch('MOUNT_COMPONENT', {'name': 'Temp2Screen'});
  }

  componentWillUnmount() {
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'Temp2Screen'});
  }
}

export default withTheme(Temp2Screen);
