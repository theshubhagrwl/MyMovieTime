import React, { useContext } from "react";
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
    width: "15vw",
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

  return (
    //TODO: A button telling show more cause displaying all movies is a mess!
    <div className={classes.root}>
      {/* {fakeData.length > 1 ? ( */}
      {/* {fakeData.map((tile) => ( */}
      {contextData.watched.length > 0 ? (
        <Grid container>
          {contextData.watched.map((tile) => (
            <Grid item xs className={classes.watchedMovieCard} key={tile.Title}>
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
