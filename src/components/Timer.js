import React, { useContext } from "react";
import { MovieContext } from "../MovieContext";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  hrsAndMinCount: {
    color: "#FFCA5A",
    fontSize: "5.4rem",
    fontWeight: "lighter",
  },
  hrsAndMinText: {
    color: "#e0fbfc",
    fontSize: "1.2rem",
  },
});

const Timer = () => {
  const contextData = useContext(MovieContext);

  const classes = useStyles();

  const convertTime = () => {
    var minutes = contextData.totalTime;
    var hours = minutes / 60;
    minutes = minutes % 60;
    return [hours, minutes];
  };

  const arr = convertTime(contextData.totalTime);
  const hr = Math.floor(arr[0]);
  const min = arr[1];

  return (
    <div>
      <Typography variant="h5">
        {hr > 0 && min > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "center",
              paddingTop: "5px",
              paddingBottom: "5px",
              // marginTop: "2px",
              // marginBottom: "2px",
            }}
          >
            <Typography classes={{ root: classes.hrsAndMinCount }}>
              {hr}
            </Typography>{" "}
            <Typography
              classes={{ root: classes.hrsAndMinText }}
              style={{ paddingRight: "10px" }}
            >
              hr
            </Typography>{" "}
            <Typography classes={{ root: classes.hrsAndMinCount }}>
              {min}
            </Typography>
            <Typography classes={{ root: classes.hrsAndMinText }}>
              min
            </Typography>{" "}
            <br />
          </div>
        ) : (
          <div
            style={{
              marginTop: "20px",
              color: "#e0fbfc",
            }}
          >
            Search for your favourite
            <span
              style={{
                color: "#FFCA5A",
                fontWeight: "light",
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
              }}
            >
              Movie
            </span>
            to get started
          </div>
        )}
      </Typography>
    </div>
  );
};

export default Timer;
