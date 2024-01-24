import React from "react";
import img_Books from "../images/Books.jpg";
import "../components/Home.css";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const signout = ()=>{
    const auth = getAuth();
  signOut(auth).then((e) => {
    // Sign-out successful.
    navigate("/")


  }).catch((error) => {
    // An error happened.
    alert("oppes !!!")
  });
  }
  
  return (
    <div>
      <div className="containerHome">
        <h1 className="Home_h1">Wellcome</h1>
        <img src={img_Books} alt="" className="Home_background-image" />
        <button className="Home_btn_SignOut" onClick={signout}>Sign Out</button>
      </div>
    </div>
  );
}

export default Home;
