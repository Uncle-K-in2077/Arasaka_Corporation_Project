/** @format */

import "../css/Home.css";
import Header from "../component/Header";
import HomeProducts from "../component/Home-Product";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    const sloganElement = document.querySelector(".typing-effect");
    sloganElement.addEventListener("animationend", () => {
      sloganElement.classList.remove("typing-effect");
    });
  }, []);

  return (
    <div className="home-container container">
      {/* background-video */}
      {/* Video làm nền */}
      <div className="video-container">
        <video autoPlay muted loop id="video-background">
          <source
            src={process.env.PUBLIC_URL + "/VIDEO-za-main-home.mp4"}
            type="video/mp4"
          />
          {/* Nếu trình duyệt không hỗ trợ video */}
          Your browser does not support the video tag.
        </video>
      </div>
      {/* header */}
      <Header />

      {/* Body */}
      <div className="row">
        {/* <h1>ARASAKA LANDING PAGE</h1> */}
        {/* <hr /> */}
        <div className="col-2"></div>
        <div className="carousel col-10">
          <p className="home-slogan typing-effect">
            I'VE SEEN THINGS YOU PEOPLE WOULDN'T BELIEVE. ALL THOSE MOMENTS WILL
            BE LOST IN TIME, LIKE TEARS IN RAIN.
          </p>
        </div>
        <div className="col-12 mb-5" style={{ textAlign: "center" }}>
          <button className="customButton2">Keep scrolling</button>
        </div>
      </div>

      {/* Bread */}
      <div className="breadcrumbs mb-5">
        <h3 style={{ margin: "0" }} className="breadcrumb-title">
          RELATED CYBERWARE
        </h3>
      </div>
      <HomeProducts />
    </div>
  );
}

export default Home;
