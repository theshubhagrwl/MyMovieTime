import React, { useContext } from "react";
import { MovieContext } from "../MovieContext";
import Typography from "@material-ui/core/Typography";

const Timer = ({ timerStyle }) => {
  const contextData = useContext(MovieContext);

  const convertTime = () => {
    var minutes = contextData.totalTime;
    var hours = minutes / 60;
    minutes = minutes % 60;
    return [hours, minutes];
  };

  const arr = convertTime();
  const hr = Math.floor(arr[0]);
  const min = arr[1];

  return (
    <Typography variant="body1" className={timerStyle}>
      {hr}h {min}min
    </Typography>
  );
};

export default Timer;
