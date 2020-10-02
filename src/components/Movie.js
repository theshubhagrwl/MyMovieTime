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
import { FormControl, InputLabel, MenuItem, Select, Badge } from "@material-ui/core";
import "../App.css";
import loadingImg from "./loading.gif";

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
  const [mTime, setMTime] = useState({});
  const time = useDebounce(mTime, 500);
  // const [IMDBrating, setIMDBrating] = useState("");
  const [selectorValue, setSelectorValue] = useState("all");

  const handleChange = (event) => {
    setSelectorValue(event.target.value);
  };

  const handleClick = async (val) => {
    var movieId = val.imdbID;
    var movieTime = "";
    var totalMovieTime = 0;
    try {
      const response = await Axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`);
      const {
        data: { Poster, Title, Type, Year, imdbID },
      } = response;
      movieTime = response.data.Runtime;
      totalMovieTime = contextData.totalTime + convertToInt(movieTime);
      contextData.setLoading(false);
      contextData.setTotalTime(totalMovieTime);
      if (Poster && Title && Type && Year && imdbID) {
        contextData.setWatchedMovieList((prevData) => {
          const alreadyExists = prevData.filter((movie) => movie.imdbID === imdbID).length > 0;
          if (alreadyExists) {
            return prevData.filter((movie) => movie.imdbID !== imdbID);
          }
          return [...prevData, { Poster, Title, Type, Year, imdbID }];
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderMovieGrid = (item, index) => {
    return (
      <Card
        raised={true}
        // onClick={() => setMTime(item)}
        className={classes.root}
      >
        <CardActionArea onClick={() => setMTime(item)}>
          <CardMedia image={item.Poster} title={item.Title} height="450px" width="auto" component="img" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" noWrap className={classes.titleText}>
              {item.Title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.Year}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ justifyContent: "center", alignItems: "center" }}>
          <Button size="medium" variant="contained" color="primary" style={{ marginBottom: "15px" }}>
            <a
              href={`https://www.imdb.com/title/${item.imdbID}`}
              target="_blank"
              style={{ textDecoration: "none", color: "white" }}
            >
              Check On IMDB
            </a>
          </Button>
        </CardActions>
      </Card>
    );
  };

  useEffect(() => {
    if (time) {
      contextData.setLoading(true);
      handleClick(time);
    }
  }, [time]);

  if (!contextData.loading && contextData.searchArray !== undefined) {
    return (
      <div className="movie-list-wrapper">
        <div className="select-form">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectorValue}
              onChange={handleChange}
            >
              <MenuItem value="all">All Movies</MenuItem>
              <MenuItem value="watched">Watched Movies</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Grid container spacing={4} justify="center">
          {selectorValue === "all"
            ? contextData.searchArray.map((item, index) => {
                if (item.Poster !== "N/A") {
                  if (contextData.watchedMovieList.filter((movie) => movie.imdbID === item.imdbID).length > 0) {
                    return (
                      <Grid item xs={12} sm={4} lg={3} xl={3} key={index}>
                        <Badge
                          key={index}
                          badgeContent="watched"
                          color="secondary"
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          {renderMovieGrid(item, index)}
                        </Badge>
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid item xs={12} sm={4} lg={3} xl={3} key={index}>
                        {renderMovieGrid(item, index)}
                      </Grid>
                    );
                  }
                }
              })
            : contextData.watchedMovieList.map((item, index) => {
                if (item.Poster !== "N/A") {
                  return (
                    <Grid item xs={12} sm={4} lg={3} xl={3} key={index}>
                      <Badge
                        key={index}
                        badgeContent="watched"
                        color="secondary"
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        {renderMovieGrid(item, index)}
                      </Badge>
                    </Grid>
                  );
                }
              })}
        </Grid>
      </div>
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
