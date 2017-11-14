// ./user-react-redux-frontend/src/actions/userActions.js
import { browserHistory } from 'react-router';
const apiUrl = "/api/";

export const signUp = (user) => {
  return (dispatch) => {console.log(user)
    dispatch(signUpRequest());
    return fetch(`${apiUrl}user/signup`, {
      method:'post',
      body:JSON.stringify(user),
      headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
 },
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          console.log(data);
          if(data.success){
            dispatch(signUpRequestSuccess(data));
            // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('userToken', data.token);
                // - redirect to the route '/feature'
                browserHistory.push('/');
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

export const signUpRequestSuccess = (data) => {
  return {
    type:'USER_SIGN_UP_REQUEST_SUCCESS',
    data
  }
}

export const fetchUserIfLoggedIn = () => {
  return (dispatch) => {
    const token = localStorage.getItem('userToken');
    if(token){
      return fetch(`${apiUrl}user/getUser`,{
        method:'get',
        headers: { 'authorization':token }
      }).then(response => {
        if(response.ok){
          response.json().then(data => {
            console.log(data);
            if(data.success){
              dispatch(setUser(data.user));
            }
          })
        }
      })

    }
    else{
      // else part if there is no token on localStorage
      return ;
    }
  }
}

export const setUser = (user) => {
  return {
    type:'SET_LOGGED_USER',
    user
  }
}

export const signOutUser = () => {
  localStorage.removeItem('userToken');
  return {
    type:'SIGN_OUT_USER'
  }
}

export const signIn = (user) => {
  return (dispatch) => {console.log(user)
    dispatch(signInRequest());
    return fetch(`${apiUrl}user/signin`, {
      method:'post',
      body:JSON.stringify(user),
      headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
 },
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          console.log(data);
          if(data.success){
            dispatch(signInRequestSuccess(data));
            // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('userToken', data.token);
                // - redirect to the route '/feature'
                browserHistory.push('/');
          }
          else{
            dispatch(signInRequestFailed(data.message));
          }
        })
      }
      else{
        response.json().then(error => {
          dispatch(signInRequestFailed(error));
        })
      }
    })
  }
}

export const signInRequest = () => {
  return {
    type:'USER_SIGN_IN_REQUEST'
  }
}

export const signInRequestFailed = (error) => {
  return {
    type:'USER_SIGN_IN_REQUEST_FAILED',
    error
  }
}

export const signInRequestSuccess = (data) => {
  return {
    type:'USER_SIGN_IN_REQUEST_SUCCESS',
    data
  }
}
