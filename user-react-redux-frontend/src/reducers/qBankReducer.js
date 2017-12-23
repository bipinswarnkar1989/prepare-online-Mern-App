// ./user-react-redux-frontend/src/reducers/qBankReducer.js
const INITIAL_STATE = {
  qBanks:null,
  isFetching:false,
  error:null,
  successMsg:null,
  CreateQbank:{
    imagePreviewUrl:null
  },
  newQbank:null
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

    case 'QBANK_IMAGE_PREVIEW':
       return {
         ...currentState,
         error:null,
         successMsg:null,
         CreateQbank:{
           imagePreviewUrl:action.imagePreviewUrl
         }
       }

   case 'REQUEST_CREATE_QBANK':
      return {
       ...currentState,
       isFetching:true
      }

  case 'SUCCESS_CREATE_QBANK':
     return {
       ...currentState,
       isFetching:false,
       newQbank:action.data.qb,
       successMsg:action.data.message,
       error:null
     }

  case 'FAILED_CREATE_QBANK':
    return {
      ...currentState,
      isFetching:false,
      newQbank:null,
      successMsg:null,
      error:action.message
    }

    default:
      return currentState;

  }
}

export default qBankReducer;
