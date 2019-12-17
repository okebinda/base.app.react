import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Text, withTheme} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Translation} from 'react-i18next';

import Events from '../../../../../lib/EventEmitter';
import NavEvents from '../../../utils/NavEvents';
import LoginForm from '../containers/LoginFormContainer';
import styles from '../../../styles/auth';


class LoginScreen extends Component {

  static navigationOptions = {
    title: "Sign In",
  };

  render() {
    const {theme} = this.props;
    return (
      <Translation>{(t) =>
        <View style={{flex: 1}}>
          <NavEvents />
          <KeyboardAwareScrollView
            contentContainerStyle={{flex:1}}
            innerRef={ref => {this.scroll = ref}}
            keyboardShouldPersistTaps="handled"
          >
              <View style={styles.headerContainer}>
                <Text h3 style={styles.headerText}>{t('app_name')}</Text>
              </View>
              <View style={styles.loginFormContainer}>
                <LoginForm navigation={this.props.navigation} />
              </View>
              <View style={styles.registerButtonContainer}>
                <Button
                  title={t('login_screen_button_register')}
                  type="outline"
                  style={styles.registerButton}
                  onPress={() => this.props.navigation.navigate('Register')}
                />
              </View>
          </KeyboardAwareScrollView>
        </View>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Events.dispatch('MOUNT_COMPONENT', {'name': 'LoginScreen'});
  }

  componentWillUnmount() {
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'LoginScreen'});
  }
}

export default withTheme(LoginScreen);
