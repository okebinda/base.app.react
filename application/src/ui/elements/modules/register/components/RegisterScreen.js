import React, {Component} from 'react';
import {Animated, View} from 'react-native';
import {Text, withTheme} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import i18next from 'i18next';
import {Translation} from 'react-i18next';

import Events from '../../../../../lib/EventEmitter';
import NavEvents from '../../../utils/NavEvents';
import Register1Form from '../containers/Register1FormContainer';
import Register2Form from '../containers/Register2FormContainer';
import styles from '../../../styles/auth';


class RegisterScreen extends Component {

  static navigationOptions = {
    title: 'Register',
  };

  constructor(props) {
    super(props);
    this.state = {
      form1: <></>,
      form2: <></>,
      title: i18next.t('register_screen_form1_title'),
      form1FadeValue: new Animated.Value(1),
      form2FadeValue: new Animated.Value(0)
    }

    this.Form1 =  <Animated.View style={{opacity: this.state.form1FadeValue}}>
                    <Register1Form navigation={this.props.navigation} toggleForm={this.toggleForm.bind(this)} />
                  </Animated.View>;
    
    this.Form2 =  <Animated.View style={{opacity: this.state.form2FadeValue}}>
                    <Register2Form navigation={this.props.navigation} />
                  </Animated.View>;
  }

  toggleForm = () => {
    Animated.timing(this.state.form1FadeValue, {
      toValue: 0,
      duration: 300
    }).start(() => {
      this.setState({
        form1: <></>,
        form2: this.Form2,
        title: i18next.t('register_screen_form2_title')
      });
      Animated.timing(this.state.form2FadeValue, {
        toValue: 1,
        duration: 500
      }).start()
    });
  }

  render() {
    const {theme} = this.props;
    return (
      <Translation>{(t) =>
        <View style={{flex: 1}}>
          <NavEvents />
          <KeyboardAwareScrollView
            innerRef={ref => {this.scroll = ref}}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{flex: 1}}>
              <View style={styles.registerHeaderContainer}>
                <Text h3 style={{textAlign: 'center'}}>{this.state.title}</Text>
              </View>
              <View style={styles.registerFormContainer}>
                {this.state.form1}
                {this.state.form2}
              </View>
            </View>
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
    Events.dispatch('MOUNT_COMPONENT', {'name': 'RegisterScreen'});
  }

  componentWillUnmount() {
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'RegisterScreen'});
  }
}

export default withTheme(RegisterScreen);
