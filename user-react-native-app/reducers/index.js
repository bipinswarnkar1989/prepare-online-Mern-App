// ./user-react-native-app/reducers/index.js
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import navReducer from './navReducer';

export default combineReducers({
  nav:navReducer,
  appState:appReducer
});
