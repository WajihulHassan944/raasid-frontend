// components/FeaturesSection.js
import React from 'react';
import { FaUtensils, FaEye, FaHistory } from 'react-icons/fa';
import './FeatureSection.css';

const features = [
  {
    title: 'What We Really Do',
    description:
      'At Raasid, we deliver high-quality ready-to-eat meals, juices, spices, and nutritious products crafted with care at our state-of-the-art PANA Force facility.',
    icon: <FaUtensils style={{ height: '30px', width: '30px' }} />,
  },
  {
    title: 'Our Vision',
    description:
      'To become a household name in premium food by blending tradition with innovation, while ensuring quality, nutrition, and customer trust across Pakistan.',
    icon: <FaEye style={{ height: '30px', width: '30px' }} />,
  },
  {
    title: 'Our Journey',
    description:
      'Rooted in a deep appreciation for authentic Pakistani flavors, Raasid now distributes products in 70+ cities and continues to expand its reach and product line.',
    icon: <FaHistory style={{ height: '30px', width: '30px' }} />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
