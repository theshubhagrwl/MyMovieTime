import React from "react";
import "../App.css";

export default function Footer() {
  return (
    <div className="stickyFooter">
      Made with ❤️ in
      <img
        src="https://img.icons8.com/doodle/48/000000/india.png"
        height="20px"
        width="20px"
      />
      India by{" "}
      <a href="#" style={{ color: "yellow", textDecoration: "none" }}>
        Shubh
      </a>
    </div>
  );
}
