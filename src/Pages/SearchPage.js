import React, { useContext } from "react";
import Movie from "../components/Movie";
import Navbar from "../components/Navbar";
import { MovieContext } from "../MovieContext";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainText: {
    color: "#fff",
  },
}));

const SearchPage = () => {
  const { searchArray } = useContext(MovieContext);

  const classes = useStyles();

  return (
    <div>
      <Navbar />

      {searchArray.length > 0 ? (
        <Movie />
      ) : (
        <div>
          <Typography variant="h3" className={classes.mainText}>
            Search your favourite movie
          </Typography>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
