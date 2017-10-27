// ./user-react-redux-frontend/src/containers/App.js
import { connect } from 'react-redux';
import * as appActions from '../actions/appActions';
import App from '../components/App';

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
    mappedShowSignInBox: () => dispatch(appActions.showSignInBox()),
    mappedToggleNav:     () => dispatch(appActions.togglenavDrawer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
