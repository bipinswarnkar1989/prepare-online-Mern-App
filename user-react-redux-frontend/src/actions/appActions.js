// ./user-react-redux-frontend/src/actions/appActions.js

export const showSignUpBox = () => {
  return {
    type:'SHOW_SIGN_IN_BOX'
  };
}

export const showSignInBox = () => {
  return {
    type:'SHOW_SIGN_UP_BOX'
  };
}

export const togglenavDrawer = () => {
  return {
    type:'TOGGLE_NAV_DRAWER'
  };
}
