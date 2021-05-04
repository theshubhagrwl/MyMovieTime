import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
import { UserContext } from "../UserContext";
import { MovieContext } from "../MovieContext";
// import { Redirect } from "react-router";
import { auth, getMovieData, deleteMovie } from "../Config/firebaseConfig";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import WatchedMovies from "../components/WatchedMovies";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  marginTopAndBottom: {
    marginTop: "2vh",
    marginBottom: "2vh",
  },
  profilePic: {
    borderRadius: "50%",
    marginRight: "3vh",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2vh",
    marginBottom: "2vh",
  },
});

const ProfilePage = () => {
  const classes = useStyles();

  const user = useContext(UserContext);
  const movieData = useContext(MovieContext);
  // const history = useHistory();

  useEffect(() => {
    if (user) {
      getMovieData(user.uid)
        .then((doc) => {
          if (doc.exists) {
            // console.log("doc data: ", doc.data().data);
            movieData.setWatched(doc.data().data);
          } else {
            console.log("doc not found");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const convertTime = () => {
    var minutes = movieData.totalTime;
    var hours = minutes / 60;
    minutes = minutes % 60;
    return [hours, minutes];
  };

  const arr = convertTime(movieData.totalTime);
  const hr = Math.floor(arr[0]);
  const min = arr[1];

  return (
    <div>
      <Navbar />
      <div
        className="flexBox"
        style={{ height: "90vh", flexDirection: "column", color: "#e0fbfc" }}
      >
        <Typography variant="h2" className={classes.marginTopAndBottom}>
          My Profile
        </Typography>
        {user ? (
          <>
            <div className={classes.profileInfo}>
              <img
                src={
                  user.photoURL ||
                  "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
                }
                alt="profile img"
                className={classes.profilePic}
              />
              <div className={classes.marginTopAndBottom}>
                <Typography variant="body1">{user.displayName}</Typography>
                <Typography variant="caption">{user.email}</Typography>
              </div>
            </div>
            <Button
              variant="contained"
              style={{ backgroundColor: "#ee6c4d", color: "#fff" }}
              onClick={() => {
                auth.signOut();
                // history.push("/signin");
              }}
              className={classes.marginTopAndBottom}
            >
              Logout
            </Button>
            <Timer />
            <WatchedMovies />
          </>
        ) : (
          <>
            <Typography variant="h6">Please Signin to Continue</Typography>
            <Link
              to="/signin"
              style={{
                textDecoration: "underline",
                color: "#FFF222",
                fontSize: "1.5em",
                fontWeight: "bold",
              }}
            >
              Signin
            </Link>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
