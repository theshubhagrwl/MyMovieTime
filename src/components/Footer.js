import React from "react";
import "../App.css";
import Coffee from "./BuyMeACoffeeButton";

export default function Footer() {
  return (
    <div className="stickyFooter">
      {/* Made with ❤️ in India by{" "}
      <a
        href="https://theshubhagrwl.in/"
        style={{ color: "yellow", textDecoration: "none" }}
      >
        Shubh{" "}
      </a> */}
      <Coffee />
    </div>
  );
}
