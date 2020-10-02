import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import { MovieContext } from "../MovieContext";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const memCache = {};

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

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "yellow",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "yellow",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  textInput: {
    textAlign: "center",
    color: "#FAD02E",
    fontSize: "18px",
    paddingTop: "10px",
    textTransform: "uppercase",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const contextData = useContext(MovieContext);
  const classes = useStyles();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const callApi = () => {
    try {
      if (memCache[searchTerm]) {
        contextData.setLoading(false);
        contextData.setSearchArray(memCache[searchTerm]);
      } else {
        Axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`).then((res) => {
          contextData.setLoading(false);
          if (res.data.Search !== undefined) {
            contextData.setSearchArray(res.data.Search);
            memCache[searchTerm] = res.data.Search;
          } else {
            contextData.setSearchArray([]);
          }
        });
      }
      // console.log("Search Arr", contextData.searchArray);
      console.log("Search term", searchTerm);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      contextData.setLoading(true);
      callApi();
    }

    // callApi();
  }, [debouncedSearchTerm]);

  return (
    <div>
      <div
        style={{
          marginBottom: "15px",
          paddingTop: "5px",
          paddingBottom: "5px",
          minWidth: "250px",
        }}
      >
        <CssTextField
          // fullWidth
          style={{
            margin: "20px",
            width: "22ch",
            minWidth: "250px",
          }}
          className={classes.margin}
          label="Enter a movie name"
          variant="standard"
          value={searchTerm}
          onChange={(e) => {
            // e.preventDefault();
            setSearchTerm(e.target.value);
          }}
          id="custom-css-outlined-input"
          inputProps={{
            className: classes.textInput,
          }}
          InputProps={{
            className: classes.textInput,
          }}
          InputLabelProps={{
            className: classes.textInput,
            style: { marginLeft: "2rem" },
          }}
        />
      </div>
    </div>
  );
};

export default SearchBox;
