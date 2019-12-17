import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from '../styles/misc';

export default class LoadingIndicator extends Component {
  render() {
    return (
      <View style={this.props.isVisible ? styles.spinnerContainer : styles.spinnerContainerHidden}>
        <ActivityIndicator
          size='large'
          color="#ffffff"
          animating={true}
          style={styles.spinner}
        />
      </View>
    )
  }
}
