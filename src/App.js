import React, { useEffect, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import "./App.css";
import Footer from "./components/Footer";
import WatchedMovies from "./components/WatchedMovies";
import Navbar from "./components/Navbar";

import { UserContext } from "./UserContext";
import { MovieContext } from "./MovieContext";

import { getMovieData } from "./Config/firebaseConfig";
import Movie from "./components/Movie";
import { makeStyles } from "@material-ui/core";
import PopularMovie from "./components/PopularMovie";

const useStyles = makeStyles((theme) => ({
  mainText: {
    color: "#FFF222",
  },
}));

const App = () => {
  const user = useContext(UserContext);
  const movieData = useContext(MovieContext);
  const { searchArray } = useContext(MovieContext);

  const classes = useStyles();

  useEffect(() => {
    if (user) {
      getMovieData(user.uid)
        .then((doc) => {
          if (doc.exists) {
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

  return (
    <>
      <Navbar />
      <div className="App">
        {/* <Typography
          variant="h1"
          style={{
            fontWeight: "bolder",
            minWidth: "150px",
            fontSize: "3em",
            color: "#FFF222",
          }}
        >
          MyMovieTime
        </Typography> */}
        {searchArray.length > 0 ? (
          <Movie />
        ) : (
          <div>
            <Typography variant="h4" className={classes.mainText}>
              Search your favourite movie
            </Typography>
          </div>
        )}
        <PopularMovie />
        <WatchedMovies />
        <div
          style={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
