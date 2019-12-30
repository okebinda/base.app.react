import React, {Component} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {withTheme} from 'react-native-elements';

import UserAccountForm from '../containers/UserAccountFormContainer';
import Events from '../../../../../lib/EventEmitter';
import NavEvents from '../../../utils/NavEvents';
import LoadingIndicator from '../../../misc/LoadingIndicator';

class UserAccountScreen extends Component {

  static navigationOptions = {
    title: "Account Settings",
  };

  render() {
    const {theme} = this.props;
    return (
      <>
        <NavEvents />
        <View style={{flex: 1}}>
          <KeyboardAwareScrollView
            innerRef={ref => {this.scroll = ref}}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{flex: 1, margin: 40}}>
              <UserAccountForm />
            </View>
          </KeyboardAwareScrollView>
        </View>
        <LoadingIndicator isVisible={this.props.isLoading} />
      </>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Events.dispatch('MOUNT_COMPONENT', {'name': 'UserAccountScreen'});
  }

  componentWillUnmount() {
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'UserAccountScreen'});
  }
}

export default withTheme(UserAccountScreen);
