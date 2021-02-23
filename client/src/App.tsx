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
import { Dashboard } from './components/Dashboard/Dashboard';
import { PrivateRoute } from './components/routing/PrivateRoute';
import { CreateProfile } from './components/profile-forms/CreateProfile';
import { EditProfile } from './components/profile-forms/EditProfile';
import { AddExperience } from './components/profile-forms/AddExperience';

interface Props {}

export const App: React.FC<Props> = () => {
  const dispatch = useDispatch();

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
            <PrivateRoute exact path="/dashboard" Component={Dashboard} />
            <PrivateRoute
              exact
              path="/create-profile"
              Component={CreateProfile}
            />
            <PrivateRoute exact path="/edit-profile" Component={EditProfile} />
            <PrivateRoute
              exact
              path="/add-experience"
              Component={AddExperience}
            />
          </Switch>
        </section>
      </div>
    </Router>
  );
};
