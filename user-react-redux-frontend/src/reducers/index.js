// ./user-react-redux-frontend/src/reducers/index.js
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';

export default combineReducers({
  appState:appReducer,
  routing,
  userState:userReducer
  // More reducers if there are
  // can go here
})
