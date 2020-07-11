import React from "react";
import SearchBox from "./components/SearchBox";
import { MovieProvider } from "./MovieContext";
import Movie from "./components/Movie";
import Timer from "./components/Timer";
import Typography from "@material-ui/core/Typography";

import "./App.css";

function App() {
  return (
    <MovieProvider>
      <div className="App">
        <Typography
          variant="h1"
          style={{ color: "#fff", fontWeight: "light", minWidth: "200px" }}
        >
          Movie Time Calculator
        </Typography>
        <Timer />
        <SearchBox />
        <Movie />
      </div>
    </MovieProvider>
  );
}

export default App;
