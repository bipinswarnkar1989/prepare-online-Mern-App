// ./user-react-redux-frontend/src/reducers/appReducer.js
const INITIAL_STATE = {
  showSignUpBox:false,
  showSignInBox:false
}

const appReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_SIGN_IN_BOX:
         return {
           ...currentState, showSignInBox:true
         }

    case SHOW_SIGN_UP_BOX:
         return {
           ...currentState, showSignUpBox:true
         }

    default:
      return currentState;

  }
}

export default appReducer;
