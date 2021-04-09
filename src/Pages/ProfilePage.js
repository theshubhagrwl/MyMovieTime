import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../UserContext";
import { isAuthenticated } from "../Config/helper";
import { Redirect, useHistory } from "react-router";
import { auth, getMovieData } from "../Config/firebaseConfig";

const ProfilePage = () => {
  const user = useContext(UserContext);
  // const { photoURL, displayName, email } = user;
  const history = useHistory();

  // console.log({ user });
  // if (user != null) console.log(user.email);
  if (user) {
    getMovieData(user.uid)
      .then((doc) => {
        if (doc.exists) {
          console.log("doc data: ", doc.data().data);
        } else {
          console.log("doc not found");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(movieDataFromFirestore);
  }
  return (
    <div>
      <Navbar />
      <h1>This is the profile page</h1>
      {/* {isAuthenticated() ? ( */}

      {user ? (
        <>
          <h1>{user.email}</h1>
          <h1>{user.displayName}</h1>
          <img
            src={
              user.photoURL ||
              "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
            }
            alt="profile img"
          />
        </>
      ) : (
        ""
      )}
      <button
        onClick={() => {
          auth.signOut();
        }}
        // onClick={() => {
        //   localStorage.setItem("uid", "");
        //   localStorage.setItem("displayName", "");
        //   localStorage.setItem("email", "");
        //   history.push("/signin");
        // }}
      >
        Logout
      </button>
      {/* ) : ( */}
      {/* <Redirect to="/signin" /> */}
      {/* )} */}
    </div>
  );
};

export default ProfilePage;
