import React, { useState, createContext } from "react";

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [searchArray, setSearchArray] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [watched, setWatched] = useState([]);

  return (
    <MovieContext.Provider
      value={{
        searchArray,
        totalTime,
        loading,
        setSearchArray,
        setTotalTime,
        setLoading,
        error,
        setError,
        watched,
        setWatched,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
