// ./user-react-redux-frontend/src/containers/MockTest.jsx
import {connect} from 'react-redux';
import MockTest from '../components/MockTest';
import * as userActions from '../actions/userActions';

const mapStateToProps = (state) => {
  return {
       mappedUserState:state.userState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
       signIn: user => dispatch(userActions.signIn(user)),
       mappedSignUpSocialUser: user => dispatch(userActions.signUpSocialUser(user)),
       mappedfetchUserIfLoggedIn: () => dispatch(userActions.fetchUserIfLoggedIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MockTest);
