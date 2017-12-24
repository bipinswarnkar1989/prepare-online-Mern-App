// ./user-react-redux-frontend/src/actions/qBankActions.jsx
import { browserHistory } from 'react-router';
const apiUrl = '/api/qbank/';

export const fetchQbanks = () => {
  return (dispatch) => {
    const token = localStorage.getItem('userToken');
    dispatch(requestFetchQbanks());
    return fetch(`${apiUrl}/Qbanks`,{
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
    return fetch(`${apiUrl}/Qbanks`,{
      method:'post',
      body:qb
    }).then(response => {
      if(response.status >= 200 && response.status < 300){
         response.json().then(data => {
           console.log(data);
           if(data.success){
             dispatch(successCreateQbank(data));
             browserHistory.push(`/question-bank/${data.qb._id}/add-questions`);
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
    return fetch(`${apiUrl}/Qbank/${id}`, {
      method:'get'
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
