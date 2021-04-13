import React, { useState, useEffect, useContext } from "react";

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
import loadingImg from "./loading.gif";
import { ButtonGroup } from "@material-ui/core";
import { addMovieData } from "../Config/firebaseConfig";
import { UserContext } from "../UserContext";

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
  },
  // image: {
  //   height: "30vh",
  //   // width: "15vw",
  // },
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
  const [IMDBrating, setIMDBrating] = useState("");

  const handleClick = async (val) => {
    var movieId = val.imdbID;
    var movieTime = "";
    var totalMovieTime = 0;
    try {
      const response = await Axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
      );
      if (typeof response.data === "object") {
        // console.log(response.data);
        // console.log("type", typeof response.data);
        contextData.watched.push(response.data);
      }
      if (user) {
        // console.log(contextData.watched);
        addMovieData(contextData.watched, user.uid);
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
        {contextData.searchArray.map((item, index) => {
          if (item.Poster !== "N/A") {
            return (
              <Grid item xs={10} sm={4} lg={2} xl={2} key={index}>
                <Card raised={true} className={classes.root}>
                  {/* <img
                    src={item.Poster}
                    alt={item.Title}
                    className={classes.image}
                  ></img> */}
                  <CardMedia
                    image={item.Poster}
                    title={item.Title}
                    height="450px"
                    // width="auto"
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
                        onClick={() => setMTime(item)}
                      >
                        Add This Movie
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{ marginBottom: "15px" }}
                      >
                        <a
                          href={`https://www.imdb.com/title/${item.imdbID}`}
                          target="_blank"
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          Check On IMDB
                        </a>
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
