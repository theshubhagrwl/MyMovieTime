import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { MovieProvider } from "./MovieContext";
import Signin from "./Pages/Signin";
import ProfilePage from "./Pages/ProfilePage";
import PageNotFound from "./Pages/PageNotFound";
import SearchPage from "./Pages/SearchPage";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./Theme";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <MovieProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/" component={App} />
              <Route exact path="/search" component={SearchPage} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="*" component={PageNotFound} />
            </Switch>
          </Router>
        </ThemeProvider>
      </MovieProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
