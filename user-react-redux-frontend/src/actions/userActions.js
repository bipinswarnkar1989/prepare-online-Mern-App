// ./user-react-redux-frontend/src/actions/userActions.js
const apiUrl = "/api/";

export const signUp = (user) => {
  return (dispatch) => {console.log(user)
    dispatch(signUpRequest());
    return fetch(`${apiUrl}user/signup`, {
      method:'post',
      body:user
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          console.log(data);
          if(data.success){
            dispatch(signUpRequestSuccess(data.user));
          }
          else{
            dispatch(signUpRequestFailed(data.message));
          }
        })
      }
      else{
        response.json().then(error => {
          dispatch(signUpRequestFailed(error));
        })
      }
    })
  }
}

export const signUpRequest = () => {
  return {
    type:'USER_SIGN_UP_REQUEST'
  }
}

export const signUpRequestFailed = (error) => {
  return {
    type:'USER_SIGN_UP_REQUEST_FAILED',
    error
  }
}

export const signUpRequestSuccess = (user) => {
  return {
    type:'USER_SIGN_UP_REQUEST_SUCCESS',
    user:user
  }
}
