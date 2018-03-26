// ./user-react-redux-frontend/src/containers/Home.js
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as qBankActions from '../actions/qBankAction';

//map state to props
const mapStateToProps = (state) => {
  return {
    mappedQbankState:state.qBankState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      mappedgetLatestqBanks: () => dispatch(qBankActions.getLatestqBanks()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
