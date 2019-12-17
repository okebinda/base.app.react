/**
 * Authentication Routes
 */

import {createStackNavigator} from 'react-navigation-stack';

import Theme from '../styles/Theme';
import LoginScreen from '../modules/session/components/LoginScreen';
import PasswordResetRequestScreen from '../modules/session/components/PasswordResetRequestScreen';
import RegisterScreen from '../modules/register/components/RegisterScreen';
import TermsOfServiceScreen from '../modules/register/components/TermsOfServiceScreen';


const AuthStackNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    PasswordResetRequest: PasswordResetRequestScreen,
    Register: RegisterScreen,
    TermsOfService: TermsOfServiceScreen
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Theme.header.colors.background,
      },
      headerTintColor: Theme.header.colors.text,
    }
  }
);

export default AuthStackNavigator;
