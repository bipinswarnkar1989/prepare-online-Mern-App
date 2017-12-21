// ./user-react-redux-frontend/src/reducers/index.js
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';
import qBankReducer from './qBankReducer';

export default combineReducers({
  appState:appReducer,
  routing,
  userState:userReducer,
  qBankState:qBankReducer
  // More reducers if there are
  // can go here
})
