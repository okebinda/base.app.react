import React, {Component} from 'react';
import {Button, Input, withTheme} from 'react-native-elements';
import {Translation} from 'react-i18next';

import Events from '../../../../../lib/EventEmitter';
import message from '../../../misc/Message';
import styles from '../../../styles/auth';


class PasswordResetForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  initialState = () => {
    let state = {};
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

  parseFeedback = (errors, joinChar=' ') => {
    const out = {};
    for (const field in errors) {
      out[field + '_InputFeedback'] = errors[field].join(joinChar);
    }
    return out;
  }

  submit = () => {
    if (!this.props.isSubmitting) {

      // reset form feedback and disable submit button
      this.setState(this.formDefaults());
      
      // API POST payload
      let payload = {};
      for (const input of Object.keys(this.props.data)) {
        if (this.state[input]) {
          payload[input] = this.state[input];
        }
      }

      // submit
      this.props.submit(payload, () => {
        this.setState(this.parseFeedback(this.props.errors));
        if (this.props.success) {
          
          message.show("password_reset_form_message_success");

        } else {
          
          message.show("password_reset_form_message_failure");

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
            label={t('password_reset_form_input_email_address')}
            autoCapitalize='none'
            autoCompleteType="email"
            autoCorrect={false}
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={(text) => this.onInputChange('email', text.toLowerCase().trim())}
            errorMessage={this.state.email_InputFeedback}
          />
          <Input
            label={t('password_reset_form_input_code')}
            autoCapitalize='characters'
            autoCompleteType="off"
            autoCorrect={false}
            keyboardType="default"
            value={this.state.code}
            onChangeText={(text) => this.onInputChange('code', text)}
            errorMessage={this.state.code_InputFeedback}
          />
          <Input
            secureTextEntry={true} 
            label={t('password_reset_form_input_password1')}
            autoCapitalize='none'
            autoCompleteType="password"
            autoCorrect={false}
            value={this.state.password1}
            onChangeText={(text) => this.onInputChange('password1', text)}
            errorMessage={this.state.password1_InputFeedback}
          />
          <Input
            secureTextEntry={true} 
            label={t('password_reset_form_input_password2')}
            autoCapitalize='none'
            autoCompleteType="password"
            autoCorrect={false}
            value={this.state.password2}
            onChangeText={(text) => this.onInputChange('password2', text)}
            errorMessage={this.state.password2_InputFeedback}
          />
          <Button
            title={t('password_reset_form_button_submit')}
            style={styles.passwordResetFormButton}
            loading={this.props.isSubmitting}
            onPress={this.submit}
          />
          <Button
            title={t('password_reset_form_button_need_code')}
            style={{}}
            type="clear"
            titleStyle={styles.passwordResetFormButtonToggleTitle}
            containerStyle={styles.passwordResetFormButtonToggleContainer}
            onPress={() => this.props.toggleForm()}
          />
        </>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Events.dispatch('MOUNT_COMPONENT', {'name': 'PasswordResetForm'});
  }

  componentWillUnmount() {
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'PasswordResetForm'});
  }
}

export default withTheme(PasswordResetForm);
