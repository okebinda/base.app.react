import {connect} from 'react-redux';

import {sessionHydrate} from '../../../../../state/actions';
import AuthLoadingScreen from '../components/AuthLoadingScreen';

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    sessionHydrate: (data) => {
      dispatch(sessionHydrate(data));
    }
  }
}

const AuthLoadingScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);

export default AuthLoadingScreenContainer;
