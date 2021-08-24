import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, StylesProvider, alpha } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchBox from "./SearchBox";
import Timer from "./Timer";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  mainLink: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.3em",
  },
  subLink: {
    textDecoration: "none",
    color: "#fff",
  },
  root: {
    flexGrow: 1,
  },
  leftItems: {
    display: "flex",
    flexGrow: 0.1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    padding: "0px 1em",
  },
  rightItems: {
    display: "flex",
    flexGrow: 0.1,
    justifyContent: "space-around",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "transparent" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div className={classes.leftItems}>
            <Typography variant="body1" className={classes.title}>
              <Link className={classes.mainLink} to="/">
                MyMovieTime
              </Link>
            </Typography>
            <Typography variant="body1" className={classes.title}>
              <a className={classes.mainLink} href="/">
                Home
              </a>
            </Typography>
            <Typography variant="body1" className={classes.title}></Typography>
          </div>

          <SearchBox placeholderText={"Search here..."} />

          <div className={classes.rightItems}>
            <Typography variant="body1" className={classes.title}>
              <Timer timerStyle={{ color: "#fff" }} />
            </Typography>

            <Typography variant="body1" className={classes.subLink}>
              {auth ? (
                <Link className={classes.subLink} to="/profile">
                  My Profile
                </Link>
              ) : (
                <Link className={classes.subLink} to="/signin">
                  Login
                </Link>
              )}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
