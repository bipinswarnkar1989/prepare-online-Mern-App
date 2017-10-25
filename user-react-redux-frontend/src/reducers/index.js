// ./user-react-redux-frontend/src/reducers/index.js
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';

export default combineReducers({
  appState:appReducer,
  routing
  // More reducers if there are
  // can go here
})
