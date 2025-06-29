import React from 'react';
import './InfoCards.css';
const infoItems = [
  {
    title: 'Halal',
    description:
      'Every product by Raasid is made following strict halal standards, ensuring purity, ethical sourcing, and trust for our consumers.',
    image: '/assets/info/Halal-01.png',
  },
  {
    title: 'Authentic Taste',
    description:
      'At Raasid, we preserve the traditional flavors you grew up loving. Our recipes are crafted to bring a genuine, home-style experience to every bite.',
    image: '/assets/info/Authentic-02.png',
  },
  {
    title: 'No Preservatives',
    description:
      'Our commitment to health means no added preservatives—just clean, natural ingredients for your peace of mind and well-being.',
    image: '/assets/info/No Preservatives-03.png',
  },
];
const InfoCards = () => {
  return (
    <div className="info-cards-container">
      {infoItems.map((item, index) => (
        <div key={index} className="info-card">
          <img src={item.image} alt={item.title} className="info-icon" />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
