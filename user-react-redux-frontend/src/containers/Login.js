// ./user-react-redux-frontend/src/containers/Login.js
import {connect} from 'react-redux';
import Login from '../components/Login';
import * as userActions from '../actions/userActions';

const mapStateToProps = (state) => {
  return {
       mappedUserState:state.userState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
       signIn: user => dispatch(userActions.signIn(user)),
       mappedSignUpSocialUser: user => dispatch(userActions.signUpSocialUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
