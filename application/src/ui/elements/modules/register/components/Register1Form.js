import React, {Component} from 'react';
import {Button, CheckBox, Input, withTheme} from 'react-native-elements';
import {Translation} from 'react-i18next';

import Events from '../../../../../lib/EventEmitter';
import styles from '../../../styles/auth';
import message from '../../../misc/Message';


class Register1Form extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  initialState = () => {
    let state = {
      tos_id_IsChecked: false,
      submitting: false,
    };
    for (const val of Object.keys(this.props.data)) {
      state[val] = '';
    }
    return {
      ...state,
      ...this.formDefaults(),
    }
  }

  formDefaults = () => {
    let defs = {};

    // reset error messages
    for (const val of Object.keys(this.props.data)) {
      defs[val + '_InputFeedback'] = '';
    }
    return defs;
  }

  // generic input change handler
  onInputChange = (input, value) => {
    this.setState({[input]: value, [input + '_InputFeedback']: ''})
  }

  onTosChange = () => {
    this.setState({
      tos_id_IsChecked: !this.state.tos_id_IsChecked,
      tos_id_InputFeedback: ''
    })
  }

  parseFeedback = (errors, joinChar=' ') => {
    const out = {};
    for (const field in errors) {
      out[field + '_InputFeedback'] = errors[field].join(joinChar);
    }
    return out;
  }

  submit = () => {
    if (!this.state.submitting) {
      this.setState({submitting: true});

      Events.dispatch('REGISTER_STEP1_FORM_SUBMIT');

      // reset form feedback and disable submit button
      this.setState(this.formDefaults());
      
      // API POST payload
      let payload = {};
      for (const input of Object.keys(this.props.data)) {
        if (this.state[input]) {
          payload[input] = this.state[input];
        }
      }
      if (this.state.tos_id_IsChecked) {
        payload['tos_id'] = this.props.tos_id;
      }

      // register
      this.props.submit(payload, () => {
        this.setState(this.parseFeedback(this.props.errors));
        if (this.props.success) {

          // login
          this.props.createSession(
            {
              username: payload.username,
              password: payload.password
            },
            () => {
              this.props.toggleForm();
            }
          );
          Events.dispatch('REGISTER_STEP1_FORM_SUBMIT_SUCCESS');

        } else {
          this.setState({submitting: false})
          message.show("register_form1_message_failure");
          Events.dispatch('REGISTER_STEP1_FORM_SUBMIT_FAILURE');
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
            placeholder={t('register_form1_input_username')}
            autoCapitalize='none'
            autoCompleteType="username"
            autoCorrect={false}
            value={this.state.username}
            onChangeText={(text) => this.onInputChange('username', text.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
            errorMessage={this.state.username_InputFeedback}
          />
          <Input
            placeholder={t('register_form1_input_email_address')}
            autoCapitalize='none'
            autoCompleteType="email"
            autoCorrect={false}
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={(text) => this.onInputChange('email', text.toLowerCase().trim())}
            errorMessage={this.state.email_InputFeedback}
          />
          <Input
            secureTextEntry={true} 
            placeholder={t('register_form1_input_password1')}
            autoCapitalize='none'
            autoCompleteType="password"
            autoCorrect={false}
            value={this.state.password}
            onChangeText={(text) => this.onInputChange('password', text)}
            errorMessage={this.state.password_InputFeedback}
          />
          <Input
            secureTextEntry={true} 
            placeholder={t('register_form1_input_password2')}
            autoCapitalize='none'
            autoCompleteType="password"
            autoCorrect={false}
            value={this.state.password2}
            onChangeText={(text) => this.onInputChange('password2', text)}
            errorMessage={this.state.password2_InputFeedback}
          />
          <CheckBox
            title={t('register_form1_input_tos')}
            center
            checked={false}
            value={this.state.tos_id}
            checked={this.state.tos_id_IsChecked}
            onPress={this.onTosChange}
            containerStyle={{borderColor: this.state.tos_id_InputFeedback ? theme.colors.error : theme.colors.grey5}}
          />
          <Button
            title={t('register_form1_button_submit')}
            loading={false}
            style={styles.registerFormButton}
            loading={this.state.submitting}
            onPress={this.submit}
          />
          <Button
            title={t('register_form1_button_tos')}
            style={{}}
            type="clear"
            titleStyle={styles.registerFormButtonTosTitle}
            containerStyle={styles.registerFormButtonTosContainer}
            onPress={() => this.props.navigation.navigate('TermsOfService')}
          />
        </>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    this.props.loadTermsOfServiceCurrent();
    Events.dispatch('MOUNT_COMPONENT', {'name': 'Register1Form'});
  }

  componentWillUnmount() {
    this.props.formDestroy();
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'Register1Form'});
  }
}

export default withTheme(Register1Form);
