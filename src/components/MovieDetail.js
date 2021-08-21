import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import { movieDetail } from "../testData";
import { Button, Typography } from "@material-ui/core";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    minHeight: "90vh",
    color: "#fff",
  },
  rightContainer: {
    marginRight: "20px",
  },
  listView: {
    listStyle: "none",
  },
  listItem: {},
  buttonGroup: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const MovieDetail = (props) => {
  const { id } = props.match.params;
  const [movieData, setMovieData] = useState({});
  const classes = useStyles();

  const getData = async () => {
    // const response = await axios.get(
    //   `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    // );
    // setMovieData(() => response.data);
    const response = movieDetail;
    setMovieData(() => response);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.leftContainer}>
        <img alt={movieData.Title} src={movieData.Poster} />
        <div className={classes.buttonGroup}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            style={{ marginBottom: "15px" }}
            // onClick={() => {
            //   setMTime(item);
            // }}
          >
            Mark Watched
          </Button>
        </div>
      </div>
      <div className={classes.rightContainer}>
        <ul className={classes.listView}>
          <Typography variant="h3">{movieData.Title}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {movieData.Year}
          </Typography>
          <li>{movieData.Genre}</li>
          <li>{movieData.Director}</li>
          <br />
          <Typography variant="h6">Plot</Typography>
          <li>{movieData.Plot}</li>
          <br />
          <li>
            <Typography variant="h6">
              IMDB: {movieData.Ratings[0].Value}
            </Typography>
          </li>
          <li>
            <Typography variant="h6">
              {movieData.Ratings[1].Source} : {movieData.Ratings[1].Value}
            </Typography>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MovieDetail;
