// ./user-react-redux-frontend/src/containers/QuestionBank.jsx
import { connect } from 'react-redux';
import QuestionBank from '../components/QuestionBank';

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
    mappedfetchQuestionBank: id => dispatch(qBankActions.fetchQuestionBank(id)),
    mappedToggleExpandQbCard: () => dispatch(qBankActions.ToggleExpandQbCard()),
    mappedUpdateQbImagePreview: image => dispatch(qBankActions.updateQbankImagePreview(image)),
    mappedfailedUpdateQbImagePreview: message => dispatch(qBankActions.failedUpdateQbImagePreview(message)),
    mappedupdateQuestionBank: qb => dispatch(qBankActions.updateQuestionBank(qb)),
    mappedOpenQbEdit: qb => dispatch(qBankActions.openQbEdit(qb)),
    mappedCloseQbEdit: () => dispatch(qBankActions.closeQbEdit()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionBank);
