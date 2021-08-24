import React, { useState, useEffect } from "react";
import Axios from "axios";

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

  const DisplayItems = ({ data }) =>
    data.results.map((item) => <div key={item.id}> {item.title} </div>);

  return (
    <div style={{ color: "#fff" }}>
      <h1>Popular movies</h1>
      {data ? <DisplayItems data={data} /> : ""}
    </div>
  );
};

export default PopularMovie;
