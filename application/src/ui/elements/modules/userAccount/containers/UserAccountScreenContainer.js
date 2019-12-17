import {connect} from 'react-redux';
import {List} from 'immutable';

import UserAccountScreen from '../components/UserAccountScreen';


const mapStateToProps = (state) => {
  return {
    isLoading: state.userAccount.get('isLoading')
  }
}

const UserAccountScreenContainer = connect(
  mapStateToProps
)(UserAccountScreen);

export default UserAccountScreenContainer;
