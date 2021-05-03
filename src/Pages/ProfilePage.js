import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../UserContext";
import { MovieContext } from "../MovieContext";
// import { Redirect } from "react-router";
import { auth, getMovieData } from "../Config/firebaseConfig";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import WatchedMovies from "../components/WatchedMovies";

const ProfilePage = () => {
  const user = useContext(UserContext);
  const movieData = useContext(MovieContext);
  // const history = useHistory();

  useEffect(() => {
    if (user) {
      getMovieData(user.uid)
        .then((doc) => {
          if (doc.exists) {
            console.log("doc data: ", doc.data().data);
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
        <Typography variant="h2">My Profile</Typography>
        {user ? (
          <>
            <img
              src={
                user.photoURL ||
                "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
              }
              alt="profile img"
            />
            <Typography variant="h6">Email: {user.email}</Typography>
            <Typography variant="h6">Name: {user.displayName}</Typography>
            <Button
              variant="contained"
              style={{ backgroundColor: "#ee6c4d", color: "#fff" }}
              onClick={() => {
                auth.signOut();
                // history.push("/signin");
              }}
            >
              Logout
            </Button>
            <div
              style={{
                margin: "10px",
              }}
            >
              {hr}hrs {min}mins
            </div>
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
