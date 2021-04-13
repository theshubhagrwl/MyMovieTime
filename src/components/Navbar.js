import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
}));

const Navbar = () => {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "transparent" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.mainLink} to="/">
              MyMovieTime
            </Link>
          </Typography>
          <div>
            <Typography variant="subtitle1" className={classes.title}>
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
