// ./user-react-redux-frontend/src/actions/qBankActions.jsx
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
