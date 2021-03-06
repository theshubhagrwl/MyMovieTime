import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router-dom";
import { auth, googleProvider } from "../Config/firebaseConfig";
import Navbar from "../components/Navbar";
import "../App.css";

const Signin = () => {
  const user = useContext(UserContext);

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log("Success");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div style={{ color: "#fff" }}>
      <Navbar />

      {user ? (
        <Redirect to="/" />
      ) : (
        <div
          className="flexBox"
          style={{ height: "90vh", flexDirection: "column" }}
        >
          <h1>Continue With Google</h1>
          <button
            className="g-button"
            onClick={signInWithGoogle}
            style={{ cursor: "pointer" }}
          >
            <img
              className="g-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/157px-Google_%22G%22_Logo.svg.png"
              alt="Google Logo"
            />
            <p className="g-text">Sign in with Google</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Signin;
