import React, {Component} from 'react';
import {Animated, View} from 'react-native';
import {Text, withTheme} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Translation} from 'react-i18next';

import Events from '../../../../../lib/EventEmitter';
import NavEvents from '../../../utils/NavEvents';
import PasswordResetRequestForm from '../containers/PasswordResetRequestFormContainer';
import PasswordResetForm from '../containers/PasswordResetFormContainer';
import styles from '../../../styles/auth';


class PasswordResetRequestScreen extends Component {

  static navigationOptions = {
    title: 'Forgot Password',
  };

  constructor(props) {
    super(props);
    this.state = {
      form1: <></>,
      form2: <></>,
      form1FadeValue: new Animated.Value(1),
      form2FadeValue: new Animated.Value(0),
      showingForm1: true,
    }

    this.Form1 =  <Animated.View style={{opacity: this.state.form1FadeValue}}>
                    <PasswordResetRequestForm navigation={this.props.navigation} toggleForm={this.toggleForm.bind(this)} />
                  </Animated.View>;
    
    this.Form2 =  <Animated.View style={{opacity: this.state.form2FadeValue}}>
                    <PasswordResetForm navigation={this.props.navigation} toggleForm={this.toggleForm.bind(this)} />
                  </Animated.View>;
  }

  toggleForm = () => {
    if (this.state.showingForm1) {
      Animated.timing(this.state.form1FadeValue, {
        toValue: 0,
        duration: 300
      }).start(() => {
        this.setState({
          form1: <></>,
          form2: this.Form2,
          showingForm1: false,
        });
        Animated.timing(this.state.form2FadeValue, {
          toValue: 1,
          duration: 500
        }).start()
      });
    } else {
      Animated.timing(this.state.form2FadeValue, {
        toValue: 0,
        duration: 300
      }).start(() => {
        this.setState({
          form1: this.Form1,
          form2: <></>,
          showingForm1: true,
        });
        Animated.timing(this.state.form1FadeValue, {
          toValue: 1,
          duration: 500
        }).start()
      });
    }
  }

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
            <View style={styles.passwordResetFormContainer}>
              {/* <PasswordResetRequestForm navigation={this.props.navigation} /> */}
              {this.state.form1}
              {this.state.form2}
            </View>
            {/* <View style={styles.passwordResetInstructionsContainer}>
              <Text style={styles.passwordResetInstructionsText}>
                {t('password_reset_screen_instructions')}
              </Text>
            </View> */}
          </KeyboardAwareScrollView>
        </View>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    this.setState({
      form1: this.Form1,
      form2: <></>
    });
    Events.dispatch('MOUNT_COMPONENT', {'name': 'PasswordResetRequestScreen'});
  }

  componentWillUnmount() {
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'PasswordResetRequestScreen'});
  }
}

export default withTheme(PasswordResetRequestScreen);
