import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router";
import { auth, getMovieData } from "../Config/firebaseConfig";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const user = useContext(UserContext);
  // const history = useHistory();

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
      <div
        className="flexBox"
        style={{ height: "90vh", flexDirection: "column", color: "#e0fbfc" }}
      >
        <Typography variant="h2">My Profile</Typography>
        {/* {isAuthenticated() ? ( */}
        {user ? (
          <>
            <img
              src={
                user.photoURL ||
                "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
              }
              alt="profile img"
            />
            <p>
              <Typography variant="h6">Email: {user.email}</Typography>
              <Typography variant="h6">Name: {user.displayName}</Typography>
            </p>
            <Button
              variant="contained"
              style={{ backgroundColor: "#ee6c4d", color: "#fff" }}
              onClick={() => {
                auth.signOut();
                // history.push("/signin");
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">Please Signin to Continue</Typography>
            {/* <Button
              variant="contained"
              style={{ backgroundColor: "#FFCA5A", color: "#fff" }}
            > */}
            <Link
              to="/signin"
              style={{
                textDecoration: "underline",
                color: "#FFF222",
                fontSize: "1.5em",
                fontWeight: "bold",
              }}
            >
              Signin
            </Link>{" "}
            {/* </Button> */}
          </>
        )}

        {/* ) : ( */}
        {/* )} */}
      </div>
    </div>
  );
};

export default ProfilePage;
