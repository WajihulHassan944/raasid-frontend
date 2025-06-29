import React from 'react';
import "./AboutDesc.css";
import { FaDotCircle } from "react-icons/fa";

const AboutDesc = () => {
  return (
    <div className="about-desc-container">
      <div className="about-title">
        <h1>How Raasid Became <br /> A Trusted Name <br /> In Premium Food Products</h1>
      </div>

      <div className="about-text">
        <p>
          At Raasid, we blend tradition with innovation to bring you authentic, high-quality food products.
          From ready-to-eat meals to refreshing juices and premium spices, every item reflects our commitment
          to purity, taste, and well-being.
        </p>
      </div>

      <div className="about-points">
        <ul>
          <li><FaDotCircle className="dot-icon" /> Certified under ISO, Halal, and Food Safety standards.</li>
          <li><FaDotCircle className="dot-icon" /> Wide distribution across 70+ cities in Pakistan.</li>
          <li><FaDotCircle className="dot-icon" /> Blending natural ingredients with modern processing.</li>
          <li><FaDotCircle className="dot-icon" /> Focused on nutrition, convenience, and customer satisfaction.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutDesc;
