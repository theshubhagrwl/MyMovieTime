import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Redirect, useHistory } from "react-router-dom";
import { auth, googleProvider } from "./Config/firebaseConfig";
import Navbar from "./components/Navbar";
import { isAuthenticated } from "./Config/helper";

const Signin = () => {
  const user = useContext(UserContext);
  const history = useHistory();

  console.log("usercontext wala hai ye", user);
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res.user);
        // localStorage.setItem("uid", res.user.uid);
        // localStorage.setItem("displayName", res.user.displayName);
        // localStorage.setItem("email", res.user.email);
        // history.replace("/profile");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div style={{ color: "#fff" }}>
      <Navbar />
      {/* {isAuthenticated() ? (
        <Redirect to="/profile" />
      ) : ( */}
      <>
        <h1>Sign in</h1>
        <button
          style={{ color: "white", background: "#220000" }}
          onClick={signInWithGoogle}
        >
          Sign In With Google
        </button>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
          alt="google icon"
        />
        <span> Continue with Google</span>
      </>
      {/* )} */}
    </div>
  );
};

export default Signin;
