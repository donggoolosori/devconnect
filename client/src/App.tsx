import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import './App.css';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { Alert } from './components/layout/Alert';

interface Props {}

export const App: React.FC<Props> = () => {
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
