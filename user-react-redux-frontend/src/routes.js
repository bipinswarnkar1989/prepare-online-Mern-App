import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import QBanksList from './containers/QBanksList';
import CreateQbank from './containers/CreateQbank';
import QuestionBank from './containers/QuestionBank';
import MockTest from './containers/MockTest';
import AddCourse from './containers/AddCourse';
import Authenticate from './middlewares/authenticate';

export default (
  <Route path='/' component={App}>
  <IndexRoute component={Home}/>
  <Route path='/register' component={Register}/>
  <Route path='/login' component={Login}/>
  <Route path="/question-banks/:page/:limit" component={QBanksList}/>
  <Route onEnter={requireAuth} path="/question-bank/create" component={CreateQbank}/>
  <Route path="/question-bank/:id" component={QuestionBank}/>
  <Route path="/question-bank/:id/add-question" component={QuestionBank}/>
  <Route path="/question-bank/:id/view-questions/:page/:limit" component={QuestionBank}/>
  <Route path="/mock-test" component={MockTest}/>
  <Route onEnter={requireAuth}  path="/add-course" component={AddCourse}/>
  </Route>
)

function requireAuth(nextState, replace) {
  if(!Authenticate()) {
    replace({
      pathname: "/login",
      state: {nextPathname: nextState.location.pathname}
    });
  }
}
