import React, {Component} from 'react';
import {Button, CheckBox, Input, withTheme} from 'react-native-elements';
import {Translation} from 'react-i18next';

import Config from '../../../../../Config';
import Events from '../../../../../lib/EventEmitter';
import styles from '../../../styles/auth';
import message from '../../../misc/Message';


class Register2Form extends Component {

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

      Events.dispatch('REGISTER_STEP2_FORM_SUBMIT');

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
          this.props.navigation.navigate(Config.get('DEFAULT_LOGIN_REDIRECT'));
          Events.dispatch('REGISTER_STEP2_FORM_SUBMIT_SUCCESS');
        } else {
          this.setState({submitting: false});
          message.show("register_form2_message_failure");
          Events.dispatch('REGISTER_STEP2_FORM_SUBMIT_FAILURE');
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
            placeholder={t('register_form2_input_first_name')}
            autoCapitalize='words'
            autoCompleteType="name"
            autoCorrect={false}
            value={this.state.first_name}
            onChangeText={(text) => this.onInputChange('first_name', text.replace(/\s+/g, ' '))}
            errorMessage={this.state.first_name_InputFeedback}
          />
          <Input
            placeholder={t('register_form2_input_last_name')}
            autoCapitalize='words'
            autoCompleteType="name"
            autoCorrect={false}
            value={this.state.last_name}
            onChangeText={(text) => this.onInputChange('last_name', text.replace(/\s+/g, ' '))}
            errorMessage={this.state.last_name_InputFeedback}
          />
          <Button
            title={t('register_form2_button_submit')}
            style={styles.registerFormButton}
            loading={this.state.submitting}
            onPress={this.submit}
          />
        </>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    this.props.loadTermsOfServiceCurrent();
    Events.dispatch('MOUNT_COMPONENT', {'name': 'Register2Form'});
  }

  componentWillUnmount() {
    this.props.formDestroy();
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'Register2Form'});
  }
}

export default withTheme(Register2Form);
