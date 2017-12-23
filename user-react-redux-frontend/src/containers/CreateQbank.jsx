// ./user-react-redux-frontend/src/containers/QBanksList.jsx
import { connect } from 'react-redux';
import CreateQbank from '../components/CreateQbank';
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
    mappedpreviewQbImagePreview: image => dispatch(qBankActions.previewQbankImage(image)),
    mappedCreateQbank: qb => dispatch(qBankActions.CreateQbank(qb)),
    mappedfailedCreateQbank: message => dispatch(qBankActions.failedCreateQbank(message))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateQbank);
