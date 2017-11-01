// ./user-react-redux-frontend/src/store/configureStore.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = initialState => {
  const middlewares = [
    thunk,
  ];

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

export default configureStore;