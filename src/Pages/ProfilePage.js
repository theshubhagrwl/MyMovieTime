import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../UserContext";
import { isAuthenticated } from "../Config/helper";
import { Redirect, useHistory } from "react-router";
const ProfilePage = () => {
  const userData = useContext(UserContext);
  const history = useHistory();

  return (
    <div>
      <Navbar />
      <h1>This is the profile page</h1>
      {isAuthenticated() ? (
        <>
          <h1>{userData.email}</h1>
          <h1>{userData.displayName}</h1>
          <button
            onClick={() => {
              localStorage.setItem("uid", "");
              localStorage.setItem("displayName", "");
              localStorage.setItem("email", "");
              history.push("/signin");
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <Redirect to="/signin" />
      )}
    </div>
  );
};

export default ProfilePage;
