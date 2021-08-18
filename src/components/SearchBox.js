import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { MovieContext } from "../MovieContext";
import { makeStyles, alpha } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// import fakeData from "../testData";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

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
  search: {
    flexGrow: 0.8,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchBox = ({ placeholderText }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const contextData = useContext(MovieContext);
  const classes = useStyles();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const callApi = () => {
    let call =
      process.env.REACT_APP_PRODUCTION == "true"
        ? `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
        : "testData.json";
    try {
      contextData.setError(null);
      Axios.get(call).then((res) => {
        contextData.setLoading(false);
        if (res.data.Search !== undefined) {
          contextData.setSearchArray(res.data.Search);
        } else {
          contextData.setSearchArray([]);
        }

        if (res.data.Error) {
          contextData.setError(res.data.Error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      contextData.setLoading(true);
      callApi();
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={placeholderText}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      {!!contextData.error && (
        <Typography className={classes.spanError}>
          {contextData.error}
        </Typography>
      )}
    </>
  );
};

export default SearchBox;
