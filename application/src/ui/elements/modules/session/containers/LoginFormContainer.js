import {connect} from 'react-redux';

import {createSession, sessionFormDestroy} from '../../../../../state/actions';
import LoginForm from '../components/LoginForm';

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.session.get('isLoading'),
    success: state.session.getIn(['form', 'success']),
    error: state.session.getIn(['form', 'errors'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createSession: (data, cb) => {
      dispatch(createSession(data, cb));
    },
    formDestroy: (formState) => {
      dispatch(sessionFormDestroy(formState));
    }
  }
}

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default LoginFormContainer
