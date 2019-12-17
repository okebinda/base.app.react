import React, {Component} from 'react';
import {Button, CheckBox, Input, withTheme} from 'react-native-elements';
import {Translation} from 'react-i18next';

import Events from '../../../../../lib/EventEmitter';
import message from '../../../misc/Message';


class UpdatePasswordForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  initialState = () => {
    let state = {
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

      Events.dispatch('PASSWORD_FORM_SUBMIT');

      // reset form feedback and disable submit button
      this.setState(this.formDefaults());
      
      // API PUT payload
      let payload = {};
      for (const input of Object.keys(this.props.data)) {
        if (this.state[input]) {
          payload[input] = this.state[input];
        }
      }

      // update
      this.props.submit(payload, () => {
        this.setState(this.parseFeedback(this.props.errors));
        if (this.props.success) {
          
          this.setState({submitting: false});
          message.show("password_form_message_success");
          Events.dispatch('PASSWORD_FORM_SUBMIT_SUCCESS');

        } else {
          this.setState({submitting: false});
          message.show("password_form_message_failure");
          Events.dispatch('PASSWORD_FORM_SUBMIT_FAILURE');
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
            secureTextEntry={true} 
            label={t('password_form_input_previous_password')}
            autoCapitalize='none'
            autoCompleteType="password"
            autoCorrect={false}
            value={this.state.previous_password}
            onChangeText={(text) => this.onInputChange('previous_password', text)}
            errorMessage={this.state.previous_password_InputFeedback}
          />
          <Input
            secureTextEntry={true} 
            label={t('password_form_input_password1')}
            autoCapitalize='none'
            autoCompleteType="password"
            autoCorrect={false}
            value={this.state.password1}
            onChangeText={(text) => this.onInputChange('password1', text)}
            errorMessage={this.state.password1_InputFeedback}
          />
          <Input
            secureTextEntry={true} 
            label={t('password_form_input_password2')}
            autoCapitalize='none'
            autoCompleteType="password"
            autoCorrect={false}
            value={this.state.password2}
            onChangeText={(text) => this.onInputChange('password2', text)}
            errorMessage={this.state.password2_InputFeedback}
          />
          <Button
            title={t('password_form_button_submit')}
            loading={false}
            loading={this.state.submitting}
            onPress={this.submit}
          />
        </>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Events.dispatch('MOUNT_COMPONENT', {'name': 'UpdatePasswordForm'});
  }

  componentWillUnmount() {
    this.props.formDestroy();
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'UpdatePasswordForm'});
  }
}

export default withTheme(UpdatePasswordForm);
