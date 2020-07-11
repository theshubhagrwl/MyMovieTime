import React, { useContext } from "react";

import Axios from "axios";
import { MovieContext } from "../MovieContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../App.css";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titleText: {
    overflow: "hidden",
  },
}));

function convertToInt(string) {
  const parsed = parseInt(string, 10);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
}

const Movie = () => {
  const contextData = useContext(MovieContext);
  const classes = useStyles();

  const handleClick = async (val) => {
    var movieId = val.imdbID;
    var movieTime = "";
    var totalMovieTime = 0;
    // console.log(movieId);
    try {
      const response = await Axios.get(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
      );
      movieTime = response.data.Runtime;
      totalMovieTime = contextData.totalTime + convertToInt(movieTime);
      contextData.setTotalTime(totalMovieTime);
      // console.log("time", totalMovieTime);
    } catch (error) {
      console.log(error);
    }
  };

  if (contextData.searchArray !== undefined) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3} justify="center" alignItems="center">
          {contextData.searchArray.map((item, index) => {
            if (item.Poster !== "N/A") {
              return (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  lg={3}
                  key={index}
                  style={{ width: "300px" }}
                >
                  <Card
                    style={{ height: "620px" }}
                    raised={true}
                    onClick={() => handleClick(item)}
                  >
                    <CardActionArea>
                      <CardMedia
                        image={item.Poster}
                        title={item.Title}
                        style={{ height: "450px" }}
                      />
                      <div className={classes.titleText}>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            noWrap
                          >
                            {item.Title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {item.Year}
                          </Typography>
                        </CardContent>
                      </div>
                    </CardActionArea>
                    <CardActions
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        onClick={() => handleClick(item)}
                        style={{ marginBottom: "15px" }}
                      >
                        Watched
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            }
          })}
        </Grid>
      </div>
    );
  } else if (
    contextData.searchArray === undefined ||
    contextData.searchArray === []
  ) {
    return <div> </div>;
  }
  // else {
  //   return <div>Loading</div>;
  // }
};

export default Movie;
