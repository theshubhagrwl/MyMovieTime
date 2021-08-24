import React, { useState, useEffect } from "react";
import Axios from "axios";
import MovieCard from "./MovieCard";
import { Grid } from "@material-ui/core";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const PopularMovie = () => {
  const [data, setData] = useState();

  const getData = () => {
    Axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=${API_KEY}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ color: "#fff" }}>
      {data ? (
        <div>
          <Grid container spacing={2}>
            {data.results.map((item) => (
              <Grid item xs={4} sm={3} lg={2} xl={1} key={item.id}>
                {console.log(item)}
                <MovieCard item={item} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PopularMovie;
