// ./user-react-redux-frontend/src/actions/qBankActions.jsx
import { browserHistory } from 'react-router';
const qbApiUrl = '/api/qbank';
const quesApiUrl = '/api/question'

export const fetchQbanks = (d) => {
  return (dispatch) => {
    const token = localStorage.getItem('userToken');
    dispatch(requestFetchQbanks());
    return fetch(`${qbApiUrl}/Qbanks/${d.page}/${d.limit}`,{
      method:'get',
      headers:{ 'authorization':token }
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          console.log(data);
          if(data.success){
            let paginationData = {
              currentPage:d.page,
              limit:d.limit,
              qBanksCount:data.count
            }
            dispatch(successFetchQbanks(data,paginationData));
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

export const successFetchQbanks = (data,paginationData) => {
  return{
    type:'SUCCESS_FETCH_QBANKS',
    data:data,
    paginationData:paginationData
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

export const showDeleteQbQuestion = (q) => {
  return{
    type:'SHOW_DELETE_QB_QUESTION',
    question:q
  }
}

export const cancelDeleteQbQuestion = () => {
  return{
    type:'CANCEL_DELETE_QB_QUESTION'
  }
}

export const deleteQbQuestion = (q) => {
  return (dispatch) => {
    let token = localStorage.getItem('userToken');
    let qId = q._id;
    dispatch(requestDeleteQbQuestion(q));
    return fetch(`${quesApiUrl}/question/${qId}`,{
      method:'delete',
      headers:{'authorization':token}
    }).then(response => {
      if(response.status >= 200 && response.status < 300){
          response.json().then(data => {
            if(data.success){
              dispatch(successDeleteQbQuestion(data));
            }
            else if (data.message && !data.success) {
              dispatch(failedDeleteQbQuestion(data.message));
            } else {

            }
          })
      }else{
        dispatch(failedDeleteQbQuestion(response.statusText));
      }
    })
  }
}

export const requestDeleteQbQuestion = (q) => {
  return{
    type:'REQUEST_DELETE_QB_QUESTION',
    question:q
  }
}

export const successDeleteQbQuestion = (data) => {
  return{
    type:'SUCCESS_DELETE_QB_QUESTION',
    data
  }
}

export const failedDeleteQbQuestion = (message) => {
  return{
    type:'FAILED_DELETE_QB_QUESTION',
    message
  }
}

export const showEditQbQuestion = (q) => {
  return{
    type:'SHOW_EDIT_QB_QUESTION',
    question:q
  }
}

export const cancelEditQbQuestion = () => {
  return{
    type:'CANCEL_EDIT_QB_QUESTION'
  }
}

export const updateEditQuestionState = (data) => {
  return{
    type:'UPDATE_EDIT_QUESTION_STATE',
    data
  }
}

export const AddNewOptionInEditQuestion = (option) => {
  return{
    type:'ADD_NEW_OPTION_IN_EDIT_QUESTION',
    option
  }
}

export const updateQuestion = (q) => {
  return (dispatch) => {
    let token = localStorage.getItem('userToken');
    dispatch(requestUpdateQuestion());
    return fetch(`${quesApiUrl}/question`,{
      method:'put',
      body:JSON.stringify(q),
      headers:{
        'authorization':token,
        'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    }).then(response => {
      if(response.status >= 200 && response.status < 300){
         response.json().then(data => {
           if(data.success){
             console.log(data)
             dispatch(successUpdateQuestion(data));
           }else if (data.message && !data.success) {
             dispatch(failedUpdateQuestion(data.message));
           }
         })
      }else {
        let error = response.statusText;
        dispatch(failedUpdateQuestion(error));
      }
    })
  }
}

export const requestUpdateQuestion = () => {
  return {
    type:'REQUEST_UPDATE_QB_QUESTION'
  }
}

export const successUpdateQuestion = (data) => {
  return {
    type:'SUCCESS_UPDATE_QB_QUESTION',
    data
  }
}

export const failedUpdateQuestion = (message) => {
  return {
    type:'FAILED_UPDATE_QB_QUESTION',
    message
  }
}

export const editQoptionMouseOver = (data) => {
  return {
    type:'EDIT_QUESTION_OPTION_MOUSE_OVER',
    data
  }
}

export const removeOptionInEditQuestion = (option) => {
  return {
    type:'REMOVE_OPTION_IN_EDIT_QUESTION',
    option
  }
}

export const getLatestqBanks = () => {
  return (dispatch) => {
    dispatch(requestgetLatestqBanks());
    return fetch(`${qbApiUrl}/Qbank/latestQbanks`, {
      method:'get'
    }).then(response => {
      if(response.status >= 200 && response.status < 300){
        response.json().then((data) => {
          if(data.success){
            dispatch(successgetLatestqBanks(data))
          }
          else if(data.message && !data.success){
            dispatch(failedgetLatestqBanks(data.message));
          }
          else{
            dispatch(failedgetLatestqBanks('Something going wrong!'));
          }
        })
      }
      else{
        let message = response.statusText;
        dispatch(failedgetLatestqBanks(message));
      }
    })
  }
}

export const requestgetLatestqBanks = () => {
  return {
    type:'REQUEST_FETCH_LATEST_QBANKS'
  }
}

export const failedgetLatestqBanks = (message) => {
  return {
    type:'FAILED_FETCH_LATEST_QBANKS',
    message
  }
}

export const successgetLatestqBanks = (data) => {
  return {
    type:'SUCCESS_FETCH_LATEST_QBANKS',
    data
  }
}


export const requestSearchQbanks = () => {
  return {
    type:'REQUEST_SEARCH_QBANKS'
  }
}

export const successSearchQbanks = (data) => {
  return {
    type:'SUCCESS_SEARCH_QBANKS',
    data
  }
}

export const failedSearchQbanks = (message) => {
  return {
    type:'FAILED_SEARCH_QBANKS',
    message
  }
}
