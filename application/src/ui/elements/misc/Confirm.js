import React from 'react';
import {Alert} from 'react-native';
import {getI18n} from 'react-i18next';

class Confirm {
  constructor() {}

  show(title, body, yesHandler) {
    Alert.alert(
      getI18n().t(title),
      getI18n().t(body),
      [
        {text: getI18n().t('confirm_alert_yes'), onPress: yesHandler},
        {text: getI18n().t('confirm_alert_cancel'), style: 'cancel'}
      ],
      {cancelable: false},
    );
  }
}

const confirm = new Confirm();
export default confirm;
