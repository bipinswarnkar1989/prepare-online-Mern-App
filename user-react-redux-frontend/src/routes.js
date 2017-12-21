import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import QBanksList from './containers/QBanksList';

export default (
  <Route path='/' component={App}>
  <IndexRoute component={Home}/>
  <Route path='/register' component={Register}/>
  <Route path='/login' component={Login}/>
  <Route path="/question-banks" component={QBanksList}/>
  </Route>
)
