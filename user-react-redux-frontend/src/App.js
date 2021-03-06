import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';

import routes from './routes';
//import '../node_modules/materialize-css/dist/css/materialize.min.css';
// import '../node_modules/materialize-css/dist/js/materialize.min.js';
import './styles.scss';
import 'font-awesome/css/font-awesome.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <div>
          <Router history = {history} routes = {routes} />
        </div>
      </Provider>
    );
  }
}

export default App;
