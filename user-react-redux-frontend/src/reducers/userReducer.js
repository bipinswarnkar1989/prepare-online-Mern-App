// ./user-react-redux-frontend/src/reducers/userReducer.js
const INITIAL_STATE = {
  user:null,
  isFetching:false,
  error:null,
  isLoggedIn:false,
  successMsg:null
}

const userReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USER_SIGN_UP_REQUEST':
          return {
            ...currentState, isFetching:true
          }


   case 'USER_SIGN_UP_REQUEST_FAILED':
         return {
           ...currentState, isFetching:false, error:action.error
         }


 case 'USER_SIGN_UP_REQUEST_SUCCESS':
       return {
         ...currentState, isFetching:false, error:null, successMsg:action.data.message, isLoggedIn:false
       }

 case 'SET_LOGGED_USER':
       return {
         ...currentState, user:action.user, isLoggedIn:true, successMsg:null, error:null
       }


 case 'SIGN_OUT_USER':
       return {
         ...currentState, user:null, isLoggedIn:false
       }

 case 'USER_SIGN_IN_REQUEST':
       return {
         ...currentState, isFetching:true
       }


case 'USER_SIGN_IN_REQUEST_FAILED':
      return {
        ...currentState, isFetching:false, error:action.error
      }


case 'USER_SIGN_IN_REQUEST_SUCCESS':
    return {
      ...currentState, isFetching:false, error:null, successMsg:action.data.message
    }

    default:
       return currentState;

  }
}

export default userReducer;
