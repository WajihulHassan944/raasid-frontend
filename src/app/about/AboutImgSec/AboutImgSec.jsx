import React from 'react';
import "./AboutImgSec.css";
import { FaPlay } from "react-icons/fa";

const AboutImgSec = () => {
  return (
    <div className="about-img-wrapper">
      <div className="image-container">
        <img
          src="/assets/home/desc.jpg"
          alt="Raasid Food Background"
          className="background-image"
        />
        <div className="play-button">
          <FaPlay />
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-box">
          <h2>70+</h2>
          <p>Cities Covered Nationwide</p>
        </div>
        <div className="stat-box">
          <h2>35+</h2>
          <p>Spice & Product Blends</p>
        </div>
        <div className="stat-box">
          <h2>1.2M+</h2>
          <p>Products Delivered Annually</p>
        </div>
        <div className="stat-box">
          <h2>6+</h2>
          <p>International Certifications</p>
        </div>
      </div>
    </div>
  );
};

export default AboutImgSec;
