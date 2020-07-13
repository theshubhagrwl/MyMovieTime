import React, { useState, createContext } from "react";

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [searchArray, setSearchArray] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [loading, setLoading] = useState(false);
  return (
    <MovieContext.Provider
      value={{
        searchArray,
        totalTime,
        loading,
        setSearchArray,
        setTotalTime,
        setLoading,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
