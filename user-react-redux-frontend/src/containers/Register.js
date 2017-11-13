// ./user-react-redux-frontend/src/containers/Register.js
import {connect} from 'react-redux';
import Register from '../components/Register';
import * as userActions from '../actions/userActions';

const mapStateToProps = (state) => {
  return {
    mappedUserState:state.userState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     signUp: user => dispatch(userActions.signUp(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
