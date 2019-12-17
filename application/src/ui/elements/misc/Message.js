import React from 'react';
import Toast from 'react-native-root-toast';
import {getI18n} from 'react-i18next';

class Message {
  constructor() {}

  show(message) {
    Toast.show(getI18n().t(message), {
      duration: 3500,
      position: 110,
      shadow: false,
      animation: true,
      hideOnPress: true,
      delay: 0,
      opacity: 0.6,
      onShow: () => {
          // calls on toast\`s appear animation start
      },
      onShown: () => {
          // calls on toast\`s appear animation end.
      },
      onHide: () => {
          // calls on toast\`s hide animation start.
      },
      onHidden: () => {
          // calls on toast\`s hide animation end.
      }
    });
  }
}

const message = new Message();
export default message;
