import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MovieContext } from "../MovieContext";
import { Grid, Typography } from "@material-ui/core";
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
  image: {
    opacity: 0.5,
    width: "10vw",
    zIndex: -1,
  },
  watchedMovieCard: {
    // background: "#3939396b",
    margin: "2px",
  },
  textContainer: {
    bottom: "30px",
    position: "relative",
    color: "#fff",
    zIndex: 10,
    fontWeight: "bold",
  },
}));

const WatchedMovies = () => {
  const classes = useStyles();
  const contextData = useContext(MovieContext);

  // const convertTime = () => {
  //   var minutes = contextData.totalTime;
  //   var hours = minutes / 60;
  //   minutes = minutes % 60;
  //   return [hours, minutes];
  // };

  // const arr = convertTime(contextData.totalTime);
  // const hr = Math.floor(arr[0]);
  // const min = arr[1];

  function convertToInt(string) {
    const parsed = parseInt(string, 10);
    if (isNaN(parsed)) {
      return 0;
    }
    return parsed;
  }

  // movieTime = response.data.Runtime;
  //     totalMovieTime = contextData.totalTime + convertToInt(movieTime);
  //     contextData.setLoading(false);
  //     contextData.setTotalTime(totalMovieTime);

  const calcTime = () => {
    var movieTime = "";
    var totalMovieTime = 0;
    contextData.watched.map((movie) => {
      movieTime = movie.Runtime;
      totalMovieTime += convertToInt(movieTime);
    });
    contextData.setTotalTime(totalMovieTime);
    console.log(totalMovieTime);
  };

  useEffect(() => {
    calcTime();
  }, [contextData.watched]);

  return (
    //TODO: A button telling show more cause displaying all movies is a mess!
    <div className={classes.root}>
      {/* {fakeData.length > 1 ? ( */}
      {/* {fakeData.map((tile) => ( */}
      {contextData.watched.length > 0 ? (
        <Grid container>
          {contextData.watched.map((tile) => (
            <Grid
              item
              xs
              className={classes.watchedMovieCard}
              key={tile.imdbID}
            >
              <img
                className={classes.image}
                src={tile.Poster}
                alt={tile.Title}
              />
              {/* <div className={classes.textContainer}>{tile.Title}</div> */}
              <Typography variant="body1" className={classes.textContainer}>
                {tile.Title}
              </Typography>
              {/* <Typography variant="subtitle2" className={classes.title}>
                {tile.Year}
              </Typography> */}
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
