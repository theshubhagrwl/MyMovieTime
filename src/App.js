import React from "react";
import SearchBox from "./components/SearchBox";
// import { MovieProvider } from "./MovieContext";
import Movie from "./components/Movie";
import Timer from "./components/Timer";
import Typography from "@material-ui/core/Typography";
import "./App.css";
import Footer from "./components/Footer";
import WatchedMovies from "./components/WatchedMovies";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    // <MovieProvider>
    <>
      <Navbar />
      <div className="App">
        <Typography
          variant="h1"
          style={{
            fontWeight: "bolder",
            minWidth: "150px",
            fontSize: "3em",
            color: "#FFF222",
          }}
        >
          MyMovieTime
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
    </>
    // </MovieProvider>
  );
};

export default App;
