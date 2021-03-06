import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import './App.css';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { Alert } from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { useDispatch } from 'react-redux';
import { loadUser } from './modules/auth';
import { Dashboard } from './components/dashboard/Dashboard';
import { PrivateRoute } from './components/routing/PrivateRoute';
import { CreateProfile } from './components/profile-forms/CreateProfile';
import { EditProfile } from './components/profile-forms/EditProfile';
import { AddExperience } from './components/profile-forms/AddExperience';
import { AddEducation } from './components/profile-forms/AddEducation';
import { Profiles } from './components/profiles/Profiles';
import { Profile } from './components/profile/Profile';
import { Posts } from './components/post/Posts';
import { Post } from './components/post/Post';

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
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id" component={Profile} />

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
            <PrivateRoute
              exact
              path="/add-education"
              Component={AddEducation}
            />
            <PrivateRoute exact path="/posts" Component={Posts} />
            <PrivateRoute exact path="/post/:post_id" Component={Post} />
          </Switch>
        </section>
      </div>
    </Router>
  );
};
