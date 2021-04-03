import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from "./Config/firebaseConfig";

import { MovieProvider } from "./MovieContext";
import { UserProvider } from "./UserContext";

import Signin from "./Signin";
import Signup from "./Signup";
import ProfilePage from "./Pages/ProfilePage";
import PageNotFound from "./PageNotFound";

// firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <MovieProvider>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </Router>
      </UserProvider>
    </MovieProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
