import React, { useState, useEffect, createContext } from "react";
import { auth } from "./Config/firebaseConfig";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      // console.log("this is user context", userAuth);
      setUser(userAuth);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
