import React from 'react';
import Registration from './pages/registration';
import Auth from './pages/auth';
import Users from './pages/users'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './App.css';

function App() {
  const [ cookies, setCookies, removeCookies ] = useCookies(['user']);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/registration'>
            <Registration />
          </Route>
          <Route path='/auth'>
            <Auth />
          </Route>
          <Route path='/'>
            <Redirect to={cookies.user ? '/users' : '/auth'}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
