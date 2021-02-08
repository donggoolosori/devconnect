import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';

import './App.css';

interface Props {}

export const App: React.FC<Props> = () => {
  return (
    <div className="App">
      <Navbar />
      <Landing />
    </div>
  );
};
