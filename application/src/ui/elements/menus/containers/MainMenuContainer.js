import {connect} from 'react-redux';

import {destroySession} from '../../../../state/actions';
import MainMenu from '../components/MainMenu';

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    destroySession: (cb) => {
      dispatch(destroySession(cb));
    }
  }
}

const MainMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default MainMenuContainer
