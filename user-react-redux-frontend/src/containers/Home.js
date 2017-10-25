// ./user-react-redux-frontend/src/containers/App.js
import { connect } from 'react-redux';
import * as appActions from '../actions/appActions';
import Home from '../components/Home';

//map state to props
const mapStateToProps = (state) => {
  return {
    mappedAppState:state.appState
  }
}

//map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    mappedShowSignUpBox: () => dispatch(appActions.showSignUpBox()),
    mappedShowSignInBox: () => dispatch(appActions.showSignInBox())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
