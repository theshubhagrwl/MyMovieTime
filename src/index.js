import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./Config/firebaseConfig";

import Signin from "./Signin";
import Signup from "./Signup";
import PageNotFound from "./PageNotFound";

import { MovieProvider } from "./MovieContext";
import { UserProvider } from "./UserContext";

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <MovieProvider>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </Router>
      </UserProvider>
    </MovieProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
