import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";

import { movieDetail } from "../testData";
import { Button, Typography } from "@material-ui/core";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

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
  poster: {
    maxHeight: "50vh",
  },
}));

const MovieDetail = (props) => {
  const { id } = props.match.params;
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const getData = () => {
    setLoading(true);
    Axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
    )
      .then((res) => {
        setMovieData(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const ShowTrailer = ({ data }) => (
    <>
      {data.videos.results.map((item) =>
        item.site === "YouTube"
          ? `https://www.youtube.com/watch?v=${item.key}`
          : ""
      )}
    </>
  );

  return (
    <div className={classes.root}>
      {loading ? (
        <Typography variant="h2">Loading</Typography>
      ) : (
        <>
          <div className={classes.leftContainer}>
            <img
              alt={movieData.title}
              className={classes.poster}
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            />
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
              <Typography variant="h3">{movieData.title}</Typography>
              <Typography variant="subtitle1" gutterBottom>
                {movieData.release_date}
              </Typography>
              {movieData.genres ? (
                <div>
                  {movieData.genres.map((item) => (
                    <span key={item.id}>
                      <Typography variant="body2">{item.name}</Typography>
                    </span>
                  ))}
                </div>
              ) : (
                ""
              )}
              <br />
              <Typography variant="h6">Overview</Typography>
              <li>{movieData.overview}</li>
              <br />
              <div>
                {movieData.videos ? <ShowTrailer data={movieData} /> : ""}
              </div>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
