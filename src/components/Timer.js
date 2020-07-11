import React, { useContext } from "react";
import { MovieContext } from "../MovieContext";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const Timer = () => {
  const contextData = useContext(MovieContext);

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
    <div style={{ alignContent: "center" }}>
      <Card
        style={{ minWidth: "400px", maxWidth: "600px", opacity: "0.85" }}
        raised={true}
      >
        <CardContent>
          <Typography
            color="primary"
            variant="subtitle1"
            style={{ fontWeight: "bold" }}
          >
            {hr > 0 && min > 0 ? (
              <span>
                Total Time Spent : {hr} Hours and {min} minutes
              </span>
            ) : (
              <span>Select some movies to find the time</span>
            )}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timer;
