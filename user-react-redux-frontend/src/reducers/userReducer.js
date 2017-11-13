// ./user-react-redux-frontend/src/reducers/userReducer.js
const INITIAL_STATE = {
  user:null,
  isFetching:false,
  error:null,
  isLoggedIn:false
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
         ...currentState, isFetching:false, error:null, user:action.user, isLoggedIn:true
       }


    default:
       return currentState;

  }
}

export default userReducer;
