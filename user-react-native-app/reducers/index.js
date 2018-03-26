// ./user-react-native-app/reducers/index.js
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import navReducer from './navReducer';
import qBankReducer from './qBankReducer';

export default combineReducers({
  nav:navReducer,
  appState:appReducer,
  qBankState:qBankReducer
});
