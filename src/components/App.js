import React from "react";
import { Route } from "react-router-dom";

import Header from "./common/Header";
import AboutPage from "./about/AboutPage";
import HomePage from "./home/HomePage";

const App = () => (
  <div className="container-fluid">
    <Header />
    <Route exact path="/" component={HomePage} />
    <Route path="/about" component={AboutPage} />
  </div>
);

export default App;
