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
  },
  image: {
    opacity: 0.4,
    width: "15vw",
  },
  watchedMovieCard: {
    background: "#3939396b",
  },
}));

const WatchedMovies = () => {
  const classes = useStyles();
  const contextData = useContext(MovieContext);

  return (
    <div className={classes.root}>
      {/* {fakeData.length > 1 ? ( */}
      {/* {fakeData.map((tile) => ( */}
      {contextData.watched.length > 0 ? (
        <Grid container spacing={3}>
          {contextData.watched.map((tile) => (
            <Grid item xs className={classes.watchedMovieCard}>
              <img
                className={classes.image}
                src={tile.Poster}
                alt={tile.Title}
              />
              <Typography variant="subtitle1" className={classes.title}>
                {tile.Title}
              </Typography>
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
