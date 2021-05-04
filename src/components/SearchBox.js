import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import { MovieContext } from "../MovieContext";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// import fakeData from "../testData";

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

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#e0fbfc",
    },
    "& label": {
      color: "#e0fbfc",
      fontWeight: "lighter",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#FFCA5A",
      borderBottomWidth: "3px",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#e0fbfc",
      borderBottomWidth: "3px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFCA5A",
      },
      "&:hover fieldset": {
        borderColor: "#e0fbfc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFCA5A",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  textInput: {
    textAlign: "center",
    color: "#FFCA5A",
    fontSize: "18px",
    paddingTop: "10px",
    textTransform: "uppercase",
  },
  margin: {
    margin: theme.spacing(1),
  },
  spanError: {
    color: "#000",
  },
}));

const SearchBox = () => {
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
            // style: { marginLeft: "2rem" },
          }}
        />
      </div>
      {!!contextData.error && (
        <Typography className={classes.spanError}>
          {contextData.error}
        </Typography>
      )}
    </div>
  );
};

export default SearchBox;
