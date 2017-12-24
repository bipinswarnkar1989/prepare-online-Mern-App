// ./user-react-redux-frontend/src/containers/AddQuestionToQb.jsx
import { connect } from 'react-redux';
import AddQuestionToQb from '../components/AddQuestionToQb';

import * as userActions from '../actions/userActions';
import * as qBankActions from '../actions/qBankActions';

const mapStateToProps = (state) => {
  return {
    mappedUserState:state.userState,
    mappedQbankState:state.qBankState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mappedfetchUserIfLoggedIn: () => dispatch(userActions.fetchUserIfLoggedIn()),
    mappedfetchQuestionBank: id => dispatch(qBankActions.fetchQuestionBank(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddQuestionToQb);
