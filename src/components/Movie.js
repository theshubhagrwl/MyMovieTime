import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { MovieContext } from "../MovieContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../App.css";
import loadingImg from "./loading.gif";
import { ButtonGroup } from "@material-ui/core";
import { addMovieData } from "../Config/firebaseConfig";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debouncedValue;
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titleText: {
    overflow: "hidden",
    fontWeight: "bold",
  },
  cardImage: {
    objectFit: "contain",
    height: "auto",
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
  const user = useContext(UserContext);
  const classes = useStyles();
  const [mTime, setMTime] = useState({});
  const time = useDebounce(mTime, 500);

  const handleClick = async (val) => {
    var movieId = val.imdbID;
    var movieTime = "";
    var totalMovieTime = 0;
    try {
      const response = await Axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
      );
      if (typeof response.data === "object") {
        contextData.watched.push(response.data);
      }
      if (user) {
        if (contextData.watched.length > 0) {
          addMovieData(contextData.watched, user.uid);
        } else {
          console.log("No Movies Added");
        }
      }

      movieTime = response.data.Runtime;
      totalMovieTime = contextData.totalTime + convertToInt(movieTime);
      contextData.setLoading(false);
      contextData.setTotalTime(totalMovieTime);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (time) {
      contextData.setLoading(true);
      handleClick(time);
    }
  }, [time]);

  if (!contextData.loading && contextData.searchArray !== undefined) {
    return (
      <Grid container spacing={4} justify="center">
        {contextData.searchArray.map((item) => {
          if (item.Poster !== "N/A") {
            return (
              <Grid item xs={10} sm={4} lg={2} xl={2} key={item.imdbID}>
                <Card raised={true} className={classes.root}>
                  <CardMedia
                    image={item.Poster}
                    title={item.Title}
                    className={classes.cardImage}
                    component="img"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      noWrap
                      className={classes.titleText}
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
                  <CardActions
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <ButtonGroup
                      orientation="vertical"
                      aria-label="vertical button group"
                      style={{ width: "auto" }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{ marginBottom: "15px" }}
                        onClick={() => {
                          setMTime(item);
                        }}
                      >
                        Mark Watched
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        style={{ marginBottom: "15px" }}
                      >
                        <Link
                          to={`/movie/${item.imdbID}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          More Details
                        </Link>
                      </Button>
                    </ButtonGroup>
                  </CardActions>
                </Card>
              </Grid>
            );
          }
        })}
      </Grid>
    );
  } else if (contextData.loading === true) {
    return (
      <div style={{ color: "white", textAlign: "center" }}>
        <img src={loadingImg} alt="loading" />
      </div>
    );
  }
};

export default Movie;
