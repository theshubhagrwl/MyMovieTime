import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from "./Config/firebaseConfig";

import { UserProvider } from "./UserContext";
import { MovieProvider } from "./MovieContext";

import Signin from "./Signin";
import Signup from "./Signup";
import ProfilePage from "./Pages/ProfilePage";
import PageNotFound from "./PageNotFound";

// firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <MovieProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </Router>
      </MovieProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
