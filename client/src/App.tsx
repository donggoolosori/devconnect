import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import './App.css';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { Alert } from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { useDispatch } from 'react-redux';
import { loadUser } from './modules/auth';
import { ThunkDispatch } from 'redux-thunk';

interface Props {}

export const App: React.FC<Props> = () => {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();

  useEffect(() => {
    // check for token in local storage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </div>
    </Router>
  );
};
