// ./user-react-redux-frontend/src/containers/App.js
import { connect } from 'react-redux';
import * as appActions from '../actions/appActions';
import Home from '../components/Home';
import * as userActions from '../actions/userActions';
import * as qBankActions from '../actions/qBankActions';

//map state to props
const mapStateToProps = (state) => {
  return {
    mappedAppState:state.appState,
    mappedUserState:state.userState,
    mappedQbankState:state.qBankState
  }
}

//map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    mappedfetchUserIfLoggedIn: () => dispatch(userActions.fetchUserIfLoggedIn()),
    mappedgetLatestqBanks: () => dispatch(qBankActions.getLatestqBanks()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
