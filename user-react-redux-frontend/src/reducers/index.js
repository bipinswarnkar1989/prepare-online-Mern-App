// ./user-react-redux-frontend/src/reducers/index.js
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';
import qBankReducer from './qBankReducer';
import videoReducer from './videoReducer';

export default combineReducers({
  appState:appReducer,
  routing,
  userState:userReducer,
  qBankState:qBankReducer,
  videoState:videoReducer
  // More reducers if there are
  // can go here
})
