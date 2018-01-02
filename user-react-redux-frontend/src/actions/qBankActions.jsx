// ./user-react-redux-frontend/src/actions/qBankActions.jsx
import { browserHistory } from 'react-router';
const qbApiUrl = '/api/qbank/';
const quesApiUrl = '/api/question/'

export const fetchQbanks = () => {
  return (dispatch) => {
    const token = localStorage.getItem('userToken');
    dispatch(requestFetchQbanks());
    return fetch(`${qbApiUrl}/Qbanks`,{
      method:'get',
      headers:{ 'authorization':token }
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          console.log(data);
          if(data.success){
            dispatch(successFetchQbanks(data));
          }
          else if(!data.success && data.message){
            dispatch(failedFetchQbanks(data.message));
          }
        })
      }
      else{
        dispatch(failedFetchQbanks('Request Failed.Something wrong.'));
      }
    })
  }
}

export const requestFetchQbanks = () => {
  return{
    type:'REQUEST_FETCH_QBANKS'
  }
}

export const successFetchQbanks = (data) => {
  return{
    type:'SUCCESS_FETCH_QBANKS',
    data
  }
}

export const failedFetchQbanks = (message) => {
  return{
    type:'FAILED_FETCH_QBANKS',
    message
  }
}

export const previewQbankImage = (imagePreviewUrl) => {
  return{
    type:'QBANK_IMAGE_PREVIEW',
    imagePreviewUrl
  }
}

export const CreateQbank = (qb) => {
  return (dispatch) => {
    dispatch(requestCreateQbank());
    const token = localStorage.getItem('userToken');
    return fetch(`${qbApiUrl}/Qbanks`,{
      method:'post',
      body:qb,
      headers:{'authorization':token}
    }).then(response => {
      if(response.status >= 200 && response.status < 300){
         response.json().then(data => {
           console.log(data);
           if(data.success){
             dispatch(successCreateQbank(data));
             browserHistory.push(`/question-bank/${data.qb._id}`);
           }
           else if(!data.success && data.message){
             dispatch(failedCreateQbank(data.message));
           }
           else{
             dispatch(failedCreateQbank('Something Going Wrong.'));
           }
         })
      }
      else{
        var error = new Error(response.statusText);
        alert(error);
      }
    })
  }
}

export const requestCreateQbank = () => {
  return{
    type:'REQUEST_CREATE_QBANK'
  }
}

export const successCreateQbank = (data) => {
  return{
    type:'SUCCESS_CREATE_QBANK',
    data
  }
}

export const failedCreateQbank = (message) => {
  return{
    type:'FAILED_CREATE_QBANK',
    message
  }
}

export const  fetchQuestionBank = (id) => {
  return (dispatch) => {
    dispatch(requestFetchQbank());
    const token = localStorage.getItem('userToken');
    return fetch(`${qbApiUrl}/Qbank/${id}`, {
      method:'get',
      headers:{'authorization':token}
    }).then(response => {
      if(response.status >= 200 && response.status < 300){
         response.json().then(data => {
           if(data.success){
             dispatch(successFetchQbank(data));
           }
           else if (!data.success && data.message) {
             dispatch(failedFetchQbank(data.message));
           }
           else{
             dispatch(failedFetchQbank('Something Going Wrong.'));
           }
         })
      }
      else{
        var error = new Error(response.statusText);
        alert(error);
      }
    })
  }
}

export const requestFetchQbank = () => {
  return{
    type:'REQUEST_FETCH_QBANK'
  }
}

export const successFetchQbank = (data) => {
  return{
    type:'SUCCESS_FETCH_QBANK',
    data
  }
}

export const failedFetchQbank = (message) => {
  return{
    type:'FAILED_FETCH_QBANK',
    message
  }
}

export const ToggleExpandQbCard = () => {
  return{
    type:'TOGGLE_EXPAND_QB_CARD'
  }
}

export const updateQbankImagePreview = (image) => {
  return{
    type:'UPDATE_QB_IMAGE_PREVIEW',
    image
  }
}

export const failedUpdateQbImagePreview = (message) => {
  return{
    type:'FAILED_UPDATE_QB_IMAGE_PREVIEW',
    message
  }
}

export const updateQuestionBank = (data) => {
  return (dispatch) => {
    dispatch(requestUpdateQbank());
    const token = localStorage.getItem('userToken');
    return fetch(`${qbApiUrl}/Qbanks`, {
      method:'put',
      body:data,
      headers:{'authorization':token}
    }).then(response => {
      if(response.status >= 200 && response.status < 300){
         response.json().then(data => {
           if(data.success){
             dispatch(successUpdateQbank(data));
           }
           else if (!data.success && data.message) {
             dispatch(failedUpdateQbank(data.message));
           }
           else{
             dispatch(failedUpdateQbank('Something Going Wrong.'));
           }
         })
      }
      else{
        var error = new Error(response.statusText);
        alert(error);
      }
    })
  }
}

export const requestUpdateQbank = () => {
  return{
    type:'REQUEST_UPDATE_QB'
  }
}

export const successUpdateQbank = (data) => {
  return{
    type:'SUCCESS_UPDATE_QB',
    data
  }
}

export const failedUpdateQbank = (message) => {
  return{
    type:'FAILED_UPDATE_QB',
    message
  }
}

export const openQbEdit = (qbToEdit) => {
  return{
    type:'OPEN_QB_EDIT',
    qbToEdit
  }
}

export const closeQbEdit = () => {
  return{
    type:'CLOSE_QB_EDIT'
  }
}

export const openConfirmDeleteQb = (qbToDelete) => {
  return{
    type:'OPEN_QB_DELETE',
    qbToDelete
  }
}

export const closeConfirmDeleteQb = () => {
  return{
    type:'CLOSE_QB_DELETE'
  }
}

export const deleteQb = (qbToDelete) => {
    return (dispatch) => {
      dispatch(requestDeleteQbank(qbToDelete));
      const token = localStorage.getItem('userToken');
      return fetch(`${qbApiUrl}/Qbank/${qbToDelete._id}`,{
        method:'delete',
        headers:{'authorization':token}
      }).then(response => {
        if(response.status >= 200 && response.status < 300){
          response.json().then(data => {
            if(data.success){
              dispatch(successDeleteQbank(data));
              browserHistory.push('/question-banks');
            }
            else if (!data.success && data.message) {
              dispatch(failedDeleteQbank(data.message));
            }
            else{
              dispatch(failedDeleteQbank('Something Going Wrong'));
            }
          })
        }
        else{
          var error = new Error(response.statusText);
          alert(error);
        }
      })
    }
}

export const requestDeleteQbank = (qbToDelete) => {
  return{
    type:'REQUEST_DELETE_QB',
    qbToDelete
  }
}

export const successDeleteQbank = (data) => {
  return{
    type:'SUCCESS_DELETE_QB',
    data
  }
}

export const failedDeleteQbank = (message) => {
  return{
    type:'FAILED_DELETE_QB',
    message
  }
}

export const showAddQuestion = (qb) => {
  return{
    type:'SHOW_ADD_QUESTION',
    qb
  }
}

export const AddNewOptionInNewQuestion = (option) => {
  return{
    type:'ADD_NEW_OPTION_IN_NEW_QUESTION',
    option
  }
}

export const updateNewQuestionState = (data) => {
  return{
    type:'UPDATE_NEW_QUESTION_STATE',
    data
  }
}

export const addNewQuestion = (data) => {
  return (dispatch) => {
    dispatch(requestAddNewQuestion());console.log(data);
    const token = localStorage.getItem('userToken');
    return fetch(`${quesApiUrl}/question`,{
      method:'post',
      body:JSON.stringify(data),
      headers:{
        'authorization':token,
        'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    }).then(response => {
      if(response.status >= 200 && response.status < 300){
         response.json().then((data) => {
           if(data.success){
             dispatch(successAddNewQuestion(data));
           }
           else if(!data.success && data.message){
             dispatch(failedAddNewQuestion(data.message));
           }
           else{
             dispatch(failedAddNewQuestion('Something Going Wrong'));
           }
         })
      }else{
        var error = new Error(response.statusText);
        alert(error);
      }
    })
  }
}

export const requestAddNewQuestion = () => {
  return{
     type:'REQUEST_ADD_NEW_QUESTION'
  }
}

export const successAddNewQuestion = (data) => {
  return{
     type:'SUCCESS_ADD_NEW_QUESTION',
     data
  }
}

export const failedAddNewQuestion = (message) => {
   return{
     type:'FAILED_ADD_NEW_QUESTION',
     message
   }
}

export const fetchQbQuestions = (qBid,page,limit) => {
  return (dispatch) => {
    dispatch(requestFetchQbQuestions(qBid,page,limit));
    return fetch(`${quesApiUrl}/questions/${qBid}/${page}/${limit}`,{
      method:'get'
    }).then(response => {
      if(response.status >= 200 && response.status < 300){
        response.json().then(data => {
          if(data.success){
            dispatch(successFetchQbQuestions(data));
          }
          else if (!data.success && data.message) {
            dispatch(failedFetchQbQuestions(data.message));
          }
        })
      }else {
        let error = new Error(response.statusText);
        dispatch(failedFetchQbQuestions(error));
      }
    })
  }
}

export const requestFetchQbQuestions = (qBid,page,limit) => {
  return{
     type:'REQUEST_FETCH_QB_QUESTIONS',
     qBid:qBid,
     page:page,
     limit:limit
  }
}

export const successFetchQbQuestions = (data) => {
  return{
    type:'SUCCESS_FETCH_QB_QUESTIONS',
    data
  }
}

export const failedFetchQbQuestions = (message) => {
  return{
    type:'FAILED_FETCH_QB_QUESTIONS',
    message
  }
}
