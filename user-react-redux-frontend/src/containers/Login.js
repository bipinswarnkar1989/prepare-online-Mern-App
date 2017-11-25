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
       mappedsetfbUser: user => dispatch(userActions.setfbUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
