import React, { Fragment } from "react";
import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Landing />
    </Fragment>
  );
};

export default App;
