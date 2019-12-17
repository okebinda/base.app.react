/**
 * Styles for Auth Screens
 */

import {Dimensions, StyleSheet} from 'react-native';

import Theme from './Theme';


let styles = StyleSheet.create({

  // header
  headerContainer: {
    flex: 1,
    paddingTop: 100,
  },
  registerHeaderContainer: {
    paddingTop: 100,
  },
  headerText: {
    textAlign: 'center',
  },

  // login form
  loginFormContainer: {
    flex: 3,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  loginFormButton: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  loginFormButtonForgotContainer: {
    paddingLeft: 60,
    paddingRight: 60,
  },
  loginFormButtonForgotTitle: {
    color: Theme.colors.grey2,
    fontSize: 16,
  },

  // register button
  registerButtonContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    margin: 40,
  },
  registerButton: {
    marginLeft: 10,
    marginRight: 10,
  },

  // register form
  registerFormContainer: {
    marginTop: 50,
    marginLeft: 40,
    marginRight: 40,
  },
  registerFormButton: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  registerFormButtonTosContainer: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  registerFormButtonTosTitle: {
    color: Theme.colors.grey2,
    fontSize: 16,
  },

  // password reset form
  passwordResetFormContainer: {
    marginTop: 100,
    marginLeft: 40,
    marginRight: 40,
  },
  passwordResetFormButton: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  passwordResetFormButtonToggleContainer: {
    paddingLeft: 60,
    paddingRight: 60,
  },
  passwordResetFormButtonToggleTitle: {
    color: Theme.colors.grey2,
    fontSize: 16,
  },

  // password reset instructions
  passwordResetInstructionsContainer: {
    paddingTop: 30,
    marginLeft: 40,
    marginRight: 40,
  },
  passwordResetInstructionsText: {
    textAlign: 'center',
    color: Theme.colors.grey2,
    fontSize: 14,
  },
});

const styles375 = StyleSheet.create({
  headerContainer: {
    flex: 1,
    paddingTop: 50,
  },
  registerHeaderContainer: {
    paddingTop: 50,
  },
  registerButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 40,
  },
  registerFormButtonTosContainer: {
    paddingLeft: 30,
    paddingRight: 30,
  },
});

const styles320 = StyleSheet.create({
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  registerHeaderContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  loginFormContainer: {
    flex: 3,
    marginLeft: 20,
    marginRight: 20,
  },
  loginFormButtonForgotContainer: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  registerButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 20,
  },
  registerFormContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  passwordResetFormContainer: {
    marginTop: 100,
    marginLeft: 20,
    marginRight: 20,
  },
});

// breakpoint: 375
if (Dimensions.get('window').width <= 375) {
  styles = StyleSheet.flatten([styles, styles375]);
}

// breakpoint: 320
if (Dimensions.get('window').width <= 320) {
  styles = StyleSheet.flatten([styles, styles320]);
}

export default styles;
