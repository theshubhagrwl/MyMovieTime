import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      className="flexBox"
      style={{
        color: "#e0fbfc",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>404 Page Not Found 😢</h1>
      <h3>
        Return to{" "}
        <Link to="/" style={{ textDecoration: "underline", color: "#e0fbfc" }}>
          Home
        </Link>{" "}
      </h3>
    </div>
  );
};

export default PageNotFound;
