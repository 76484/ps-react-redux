import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import AboutPage from "./about/AboutPage";
import CoursesPage from "./courses/CoursesPage";
import HomePage from "./home/HomePage";
import ManageCoursePage from "./courses/ManageCoursePage"; // eslint-disable-line import/no-named-as-default

const App = () => (
  <div className="container-fluid">
    <ToastContainer autoClose={3000} hideProgressBar />
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/course/:slug" component={ManageCoursePage} />
      <Route path="/course" component={ManageCoursePage} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default App;
