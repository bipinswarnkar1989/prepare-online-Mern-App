// ./user-react-redux-frontend/src/containers/QBanksList.jsx
import { connect } from 'react-redux';
import QBanksList from '../components/QBanksList';
import * as userActions from '../actions/userActions';
import * as qBankActions from '../actions/qBankActions';

//map state to props
const mapStateToProps = (state) => {
  return{
      mappedUserState:state.userState,
      mappedQbankState:state.qBankState
  }
}

//map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
     mappedfetchUserIfLoggedIn: () => dispatch(userActions.fetchUserIfLoggedIn()),
     mappedfetchQbanks: (data) => dispatch(qBankActions.fetchQbanks(data)),
     mappedrequestSearchQbanks: () => dispatch(qBankActions.requestSearchQbanks()),
     mappedsuccessSearchQbanks: data => dispatch(qBankActions.successSearchQbanks(data)),
     mappedfailedSearchQbanks: message => dispatch(qBankActions.failedSearchQbanks(message)),
     mappedaddQbanksToDelete: qb => dispatch(qBankActions.addQbanksToDelete(qb)),
     mappedshowMultipleDeleteQbanks: resp => dispatch(qBankActions.showMultipleDeleteQbanks(resp)),
     mappeddeleteMultipleQbanks: qbIds => dispatch(qBankActions.deleteMultipleQbanks(qbIds)),
     mappedbookMarkQb: data  => dispatch(qBankActions.bookMarkQb(data)),
     mappedgetBookMarks: data => dispatch(qBankActions.getBookMarks(data)),
     mappedRmbookMarkQb: data => dispatch(qBankActions.rmBookMarkQb(data)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(QBanksList);
