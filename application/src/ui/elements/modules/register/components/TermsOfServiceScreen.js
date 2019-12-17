import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Text, withTheme} from 'react-native-elements';

import Events from '../../../../../lib/EventEmitter';
import NavEvents from '../../../utils/NavEvents';

class TermsOfServiceScreen extends Component {

  static navigationOptions = {
    title: 'Terms of Service',
  };

  render() {
    const {theme} = this.props;
    return (
      <>
        <NavEvents />
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flex:1}}
          >
            <View style={{margin: 40}}>
              <Text>Terms of Service text goes here...</Text>
            </View>
          </ScrollView>
        </View>
      </>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Events.dispatch('MOUNT_COMPONENT', {'name': 'TermsOfServiceScreen'});
  }

  componentWillUnmount() {
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'TermsOfServiceScreen'});
  }
}

export default withTheme(TermsOfServiceScreen);
