/**
 * Styles for Miscellaneous Elements
 */

import {Dimensions, StyleSheet} from 'react-native';

import Theme from './Theme';


let styles = StyleSheet.create({

  // loading spinner
  spinnerContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    justifyContent:
    'center',
    alignItems: 'center'
  },
  spinnerContainerHidden: {
    display: 'none'
  },
  spinner: {
    backgroundColor: 'rgba(50, 50, 50, 0.6)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 6,
    paddingRight: 6,
    borderRadius: 6,
  }
});

export default styles;
