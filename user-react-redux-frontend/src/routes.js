import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import QBanksList from './containers/QBanksList';
import CreateQbank from './containers/CreateQbank';
import AddQuestionToQb from './containers/AddQuestionToQb';

export default (
  <Route path='/' component={App}>
  <IndexRoute component={Home}/>
  <Route path='/register' component={Register}/>
  <Route path='/login' component={Login}/>
  <Route path="/question-banks" component={QBanksList}/>
  <Route path="/question-bank/create" component={CreateQbank}/>
  <Route path="question-bank/:id/add-questions" component={AddQuestionToQb}/>
  </Route>
)
