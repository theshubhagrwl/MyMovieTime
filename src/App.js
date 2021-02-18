import React from "react";
import SearchBox from "./components/SearchBox";
import { MovieProvider } from "./MovieContext";
import Movie from "./components/Movie";
import Timer from "./components/Timer";
import Typography from "@material-ui/core/Typography";
import "./App.css";
import Footer from "./components/Footer";
import WatchedMovies from "./components/WatchedMovies";

const App = () => {
  return (
    <MovieProvider>
      <div className="App">
        <Typography
          variant="h1"
          style={{
            color: "#fff",
            fontWeight: "bolder",
            minWidth: "200px",
            fontSize: "4.3rem",
          }}
        >
          Movie Time Calculator
        </Typography>
        <Timer />
        <SearchBox />
        <WatchedMovies />
        <Movie />
        <div
          style={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Footer />
        </div>
      </div>
    </MovieProvider>
  );
};

export default App;
