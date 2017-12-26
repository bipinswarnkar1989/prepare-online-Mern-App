// ./user-react-redux-frontend/src/reducers/qBankReducer.js
const INITIAL_STATE = {
  qBanks:null,
  isFetching:false,
  error:null,
  successMsg:null,
  CreateQbank:{
    imagePreviewUrl:null,
    openDialog:false,
    QbankToEdit:null
  },
  newQbank:null,
  fetchedQbank:null,
  expandQb:true,
  UpdateQbank:{
    imagePreviewUrl:null
  },
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

    case 'REQUEST_FETCH_QBANK':
       return {
        ...currentState,
        isFetching:true
       }

   case 'SUCCESS_FETCH_QBANK':
      return {
        ...currentState,
        isFetching:false,
        fetchedQbank:action.data.qb,
        successMsg:action.data.message,
        error:null
      }

   case 'FAILED_FETCH_QBANK':
     return {
       ...currentState,
       isFetching:false,
       fetchedQbank:null,
       successMsg:null,
       error:action.message
     }

  case 'TOGGLE_EXPAND_QB_CARD':
     return {
       ...currentState,
       expandQb: !currentState.expandQb
     }

 case 'UPDATE_QB_IMAGE_PREVIEW':
    return {
      ...currentState,
      expandQb:currentState.expandQb,
      UpdateQbank:{
        imagePreviewUrl:action.image
      },
      error:null,
      success:null
    }

case 'FAILED_UPDATE_QB_IMAGE_PREVIEW':
  return {
    ...currentState,
    expandQb:currentState.expandQb,
    UpdateQbank:currentState.UpdateQbank,
    error:action.message,
    success:null
  }

case 'FAILED_UPDATE_QB':
   return {
     ...currentState,
     expandQb:currentState.expandQb,
     UpdateQbank:{
       imagePreviewUrl:null
     },
     fetchedQbank:currentState.fetchedQbank,
     successMsg:null,
     error:action.message,
     isFetching:false
   }

 case 'REQUEST_UPDATE_QB':
    return {
      ...currentState,
      expandQb:currentState.expandQb,
      UpdateQbank:currentState.UpdateQbank,
      fetchedQbank:currentState.fetchedQbank,
      successMsg:null,
      error:null,
      isFetching:true
    }

    case 'SUCCESS_UPDATE_QB':
       return {
         ...currentState,
         expandQb:currentState.expandQb,
         UpdateQbank:{
           imagePreviewUrl:null
         },
         fetchedQbank:action.data.qb,
         successMsg:action.data.message,
         error:null,
         isFetching:false
       }

   case 'OPEN_QB_EDIT':
   return {
     ...currentState,
     expandQb:currentState.expandQb,
     UpdateQbank:{
       imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
       openDialog:true,
       QbankToEdit:action.qbToEdit
     },
     fetchedQbank:currentState.fetchedQbank,
     successMsg:null,
     error:null,
     isFetching:false
   }

   case 'CLOSE_QB_EDIT':
   return {
     ...currentState,
     expandQb:currentState.expandQb,
     UpdateQbank:{
       imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
       openDialog:false,
       QbankToEdit:null
     },
     fetchedQbank:currentState.fetchedQbank,
     successMsg:null,
     error:null,
     isFetching:false
   }

    default:
      return currentState;

  }

}

export default qBankReducer;
