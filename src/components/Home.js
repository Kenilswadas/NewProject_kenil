import React from "react";
import img_Books from "../images/Books.jpg";
import "../components/Homepage.css";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import SignIn from "./SignIn";

function Home() {
  return (
    <div>
      <div className="container">
        <h1>Wellcome</h1>
        <img src={img_Books} alt="" className="background-image" />
      </div>
    </div>
  );
}

export default Home;
