import React, {Component} from 'react';
import {Button, CheckBox, Input, withTheme} from 'react-native-elements';
import {Translation} from 'react-i18next';

import Events from '../../../../../lib/EventEmitter';
import message from '../../../misc/Message';


class UserAccountForm extends Component {

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

      Events.dispatch('USER_ACCOUNT_FORM_SUBMIT');

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
          message.show("user_account_form_message_success");
          Events.dispatch('USER_ACCOUNT_FORM_SUBMIT_SUCCESS');

        } else {
          this.setState({submitting: false});
          message.show("user_account_form_message_failure");
          Events.dispatch('USER_ACCOUNT_FORM_SUBMIT_FAILURE');
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
            label={t('user_account_form_input_username')}
            autoCapitalize='none'
            autoCompleteType="username"
            autoCorrect={false}
            value={this.state.username}
            onChangeText={(text) => this.onInputChange('username', text.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
            errorMessage={this.state.username_InputFeedback}
          />
          <Input
            label={t('user_account_form_input_email_address')}
            autoCapitalize='none'
            autoCompleteType="email"
            autoCorrect={false}
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={(text) => this.onInputChange('email', text.toLowerCase().trim())}
            errorMessage={this.state.email_InputFeedback}
          />
          <Input
            label={t('user_account_form_input_first_name')}
            autoCapitalize='words'
            autoCompleteType="name"
            autoCorrect={false}
            value={this.state.first_name}
            onChangeText={(text) => this.onInputChange('first_name', text.replace(/\s+/g, ' '))}
            errorMessage={this.state.first_name_InputFeedback}
          />
          <Input
            label={t('user_account_form_input_last_name')}
            autoCapitalize='words'
            autoCompleteType="name"
            autoCorrect={false}
            value={this.state.last_name}
            onChangeText={(text) => this.onInputChange('last_name', text.replace(/\s+/g, ' '))}
            errorMessage={this.state.last_name_InputFeedback}
          />
          <Button
            title={t('user_account_form_button_submit')}
            loading={false}
            loading={this.props.isSubmitting}
            onPress={this.submit}
          />
        </>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Events.dispatch('MOUNT_COMPONENT', {'name': 'UserAccountForm'});

    // initialize data from props (via the store)
    this.setState(this.props.data);

    // initialize data from API
    this.props.load((success) => {
      if (success){
        this.setState(this.props.data);
      }
    });
  }

  componentWillUnmount() {
    this.props.formDestroy();
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'UserAccountForm'});
  }
}

export default withTheme(UserAccountForm);
