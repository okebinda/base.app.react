import React, {Component} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {withTheme} from 'react-native-elements';

import UpdatePasswordForm from '../containers/UpdatePasswordFormContainer';
import Events from '../../../../../lib/EventEmitter';
import NavEvents from '../../../utils/NavEvents';

class UpdatePasswordScreen extends Component {

  static navigationOptions = {
    title: "Update Password",
  };

  render() {
    const {theme} = this.props;
    return (
      <>
        <NavEvents />
        <View style={{flex: 1}}>
          <KeyboardAwareScrollView
            contentContainerStyle={{flex:1}}
            innerRef={ref => {this.scroll = ref}}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{margin: 40}}>
              <UpdatePasswordForm />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Events.dispatch('MOUNT_COMPONENT', {'name': 'UpdatePasswordScreen'});
  }

  componentWillUnmount() {
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'UpdatePasswordScreen'});
  }
}

export default withTheme(UpdatePasswordScreen);
