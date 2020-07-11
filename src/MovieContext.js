import React, { useState, createContext } from "react";

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [searchArray, setSearchArray] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  return (
    <MovieContext.Provider
      value={{ searchArray, totalTime, setSearchArray, setTotalTime }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
