import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MovieContext } from "../MovieContext";
import { Grid, Button } from "@material-ui/core";

import { deleteMovie } from "../Config/firebaseConfig";
import { UserContext } from "../UserContext";
// import fakeData from "../testData";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "10vh",
  },
  title: {
    color: "#fff",
    zIndex: 10,
  },
  imageContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    // width: "15vh",
    maxHeight: "20vh",
    zIndex: -1,
    opacity: 0.7,
  },
  watchedMovieCard: {
    margin: "0px",
  },
  textContainer: {
    top: "0%",
    [theme.breakpoints.up("sm")]: {
      right: "0%",
    },
    right: "30%",
    position: "absolute",
    zIndex: 10,
    color: "red",
    fontSize: "3.5vh",
  },
}));

const WatchedMovies = () => {
  const classes = useStyles();
  const contextData = useContext(MovieContext);
  const user = useContext(UserContext);

  function convertToInt(string) {
    const parsed = parseInt(string, 10);
    if (isNaN(parsed)) {
      return 0;
    }
    return parsed;
  }

  const calcTime = () => {
    var movieTime = "";
    var totalMovieTime = 0;
    contextData.watched.map((movie) => {
      movieTime = movie.Runtime;
      totalMovieTime += convertToInt(movieTime);
    });
    contextData.setTotalTime(totalMovieTime);
  };

  useEffect(() => {
    calcTime();
  }, [contextData.watched]);

  return (
    <div className={classes.root}>
      {contextData.watched.length > 0 ? (
        <Grid container>
          {contextData.watched.map((tile) => (
            <Grid
              item
              xs
              className={classes.watchedMovieCard}
              key={tile.imdbID}
            >
              <div className={classes.imageContainer}>
                <img
                  className={classes.image}
                  src={tile.Poster}
                  alt={tile.Title}
                />
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    backgroundColor: "#ee6c4d",
                    color: "#fff",
                    marginTop: "1vh",
                  }}
                  onClick={() => {
                    deleteMovie(tile, user.uid);
                    console.log(`Deleted : ${tile.Title}`);
                    contextData.setWatched(
                      contextData.watched.filter(
                        (item) => item.imdbID !== tile.imdbID
                      )
                    );
                  }}
                >
                  Delete
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        ""
      )}
    </div>
  );
};
export default WatchedMovies;
