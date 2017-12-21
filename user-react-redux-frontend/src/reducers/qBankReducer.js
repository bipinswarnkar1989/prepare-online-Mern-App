// ./user-react-redux-frontend/src/reducers/qBankReducer.js
const INITIAL_STATE = {
  qBanks:null,
  isFetching:false,
  error:null,
  successMsg:null
}

const qBankReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REQUEST_FETCH_QBANKS':
       return {
         ...currentState, isFetching:true
       }

    case 'SUCCESS_FETCH_QBANKS':
       return {
         ...currentState, isFetching:false,qBanks:action.data.qb,successMsg:action.data.message
       }

    case 'FAILED_FETCH_QBANKS':
       return {
         ...currentState, isFetching:false,qBanks:null,successMsg:null,error:action.message
       }

    default:
      return currentState;

  }
}

export default qBankReducer;
