import React, {Component} from 'react';
import {Keyboard, View} from 'react-native';
import {Button, Input, withTheme} from 'react-native-elements';
import {Translation} from 'react-i18next';

import Events from '../../../../../lib/EventEmitter';
import Config from '../../../../../Config';
import styles from '../../../styles/auth';
import message from '../../../misc/Message';


class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitting: false,
    }
  }

  // generic input change handler
  onInputChange = (input, text) => {
    if (this.props.error) {
      this.props.formDestroy();
    }
    this.setState({[input]: text});
  }

  submit = () => {
    Keyboard.dismiss();
    if (!this.state.submitting) {
      this.setState({submitting: true});

      Events.dispatch('LOGIN_FORM_SUBMIT');

      // API POST/PUT payload
      let payload = {
        "username": this.state.username,
        "password": this.state.password
      };

      // create session
      this.props.createSession(payload, () => {
        if (this.props.success) {
            this.props.navigation.navigate(Config.get('DEFAULT_LOGIN_REDIRECT'));
            Events.dispatch('LOGIN_FORM_SUBMIT_SUCCESS');
        } else {
          this.setState({submitting: false});
          message.show(this.props.error);
          Events.dispatch('LOGIN_FORM_SUBMIT_FAILURE');
        }
      });
    }
  }

  render() {
    const {theme} = this.props;
    return (
      <Translation>{(t) =>
        <>
          <Input
            placeholder={t('login_form_input_username')}
            autoCapitalize='none'
            autoCompleteType="username"
            autoCorrect={false}
            rightIcon={{ 
              type: 'font-awesome',
              name: 'user',
              color: theme.colors.grey3,
            }}
            onChangeText={(text) => this.onInputChange('username', text)}
          />
          <Input
            secureTextEntry={true} 
            placeholder={t('login_form_input_password')}
            autoCapitalize='none'
            autoCompleteType="password"
            autoCorrect={false}
            rightIcon={{
              type: 'font-awesome',
              name: 'lock',
              color: theme.colors.grey3,
            }}
            onChangeText={(text) => this.onInputChange('password', text)}
          />
          <Button
            title={t('login_form_button_submit')}
            style={styles.loginFormButton}
            loading={this.state.submitting}
            onPress={this.submit}
          />
          <Button
            title={t('login_form_button_forgot_password')}
            style={{}}
            type="clear"
            titleStyle={styles.loginFormButtonForgotTitle}
            containerStyle={styles.loginFormButtonForgotContainer}
            onPress={() => this.props.navigation.navigate('PasswordResetRequest')}
          />
        </>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Events.dispatch('MOUNT_COMPONENT', {'name': 'LoginForm'});
  }

  componentWillUnmount() {
    this.props.formDestroy();
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'LoginForm'});
  }
}

export default withTheme(LoginForm);
