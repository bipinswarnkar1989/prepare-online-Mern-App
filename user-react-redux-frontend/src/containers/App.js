// ./user-react-redux-frontend/src/containers/App.js
import { connect } from 'react-redux';
import * as appActions from '../actions/appActions';
import App from '../components/App';
import * as userActions from '../actions/userActions';

//map state to props
const mapStateToProps = (state) => {
  return {
    mappedAppState:state.appState,
    mappedUserState:state.userState
  }
}

//map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    mappedLogOut: () => dispatch(userActions.signOutUser()),
    mappedToggleNav:     () => dispatch(appActions.togglenavDrawer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
