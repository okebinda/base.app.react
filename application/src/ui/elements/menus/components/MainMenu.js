import React, {Component} from 'react';
import {ListItem} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-navigation';
import {Translation} from 'react-i18next';

import Events from '../../../../lib/EventEmitter';
import Theme from '../../styles/Theme';
import confirm from '../../misc/Confirm';


class MainMenu extends Component {

  _logoutClickHander = () => {
    confirm.show(
      'confirm_alert_logout_title',
      'confirm_alert_logout_body',
      async () => {
        this.props.destroySession(() => {
          this.props.navigation.navigate('Auth');
        });
      }
    );
  }

  render() {

    const defaultStyles = {
      title: {
        color: Theme.colors.grey1
      },
      icon: {
        color: Theme.colors.grey4,
        width: 26
      }
    }

    return (
      <Translation>{(t) =>
        <ScrollView>
          <SafeAreaView
            forceInset={{ top: 'always', horizontal: 'never' }}
          >
            <ListItem
              title="Screen 1"
              bottomDivider
              leftIcon={{
                name: 'home',
                type: 'font-awesome',
                color: defaultStyles.icon.color,
                iconStyle: {width: defaultStyles.icon.width}
              }}
              titleStyle={{color: defaultStyles.title.color}}
              onPress={() => {
                this.props.navigation.navigate('Temp1');
                this.props.navigation.closeDrawer();
              }}
            />
            <ListItem
              title="Screen 2"
              bottomDivider
              leftIcon={{
                name: 'list',
                type: 'font-awesome',
                color: defaultStyles.icon.color,
                iconStyle: {width: defaultStyles.icon.width}
              }}
              titleStyle={{color: defaultStyles.title.color}}
              onPress={() => {
                this.props.navigation.navigate('Temp2');
                this.props.navigation.closeDrawer();
              }}
            />
            <ListItem
              title={t('menu_item_account_settings')}
              bottomDivider
              leftIcon={{
                name: 'user',
                type: 'font-awesome',
                color: defaultStyles.icon.color,
                iconStyle: {width: defaultStyles.icon.width}
              }}
              titleStyle={{color: defaultStyles.title.color}}
              onPress={() => {
                this.props.navigation.navigate('UserAccount');
                this.props.navigation.closeDrawer();
              }}
            />
            <ListItem
              title={t('menu_item_update_password')}
              bottomDivider
              leftIcon={{
                name: 'lock',
                type: 'font-awesome',
                color: defaultStyles.icon.color,
                iconStyle: {width: defaultStyles.icon.width}
              }}
              titleStyle={{color: defaultStyles.title.color}}
              onPress={() => {
                this.props.navigation.navigate('UpdatePassword');
                this.props.navigation.closeDrawer();
              }}
            />
            <ListItem
              title={t('menu_item_logout')}
              bottomDivider
              leftIcon={{
                name: 'sign-out',
                type: 'font-awesome',
                color: defaultStyles.icon.color,
                iconStyle: {width: defaultStyles.icon.width}
              }}
              titleStyle={{color: defaultStyles.title.color}}
              onPress={this._logoutClickHander}
            />
          </SafeAreaView>
        </ScrollView>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Events.dispatch('MOUNT_COMPONENT', {'name': 'MainMenu'});
  }

  componentWillUnmount() {
    Events.dispatch('UNMOUNT_COMPONENT', {'name': 'MainMenu'});
  }
}

export default MainMenu;
