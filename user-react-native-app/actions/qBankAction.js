import Api from '../utils/api';
const qbApiUrl = 'http://192.168.43.102:3001/api/qbank';
const quesApiUrl = '/api/question';
const bMqBApiUrl = '/api/qbbookmark';
const ApiObj = new Api();

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

  export const getLatestqBanks = () => {
      return (dispatch) => {
         return ApiObj
            .fetchData('get',`${qbApiUrl}/Qbank/latestQbanks`,null,null)
            .then(response => {
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