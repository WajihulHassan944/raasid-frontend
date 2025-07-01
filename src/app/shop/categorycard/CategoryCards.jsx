'use client';

import React from 'react';
import Link from 'next/link';
import './CategoryCards.css';

const iconMap = {
  'Fruits Preserves': (
    <img src="/assets/image6.png" alt="Fruits Preserves" className="category-img" />
  ),
  'Ready to Eat Meals': (
    <img src="/assets/image3.png" alt="Ready to Eat Meals" className="category-img" />
  ),
  'MREs': (
    <img src="/assets/image4.png" alt="MREs" className="category-img" />
  ),
  'GRANOLA BARS': (
    <img src="/assets/image5.png" alt="Granola Bars" className="category-img" />
  ),
};

const cardData = [
  { title: 'Fruits Preserves' },
  { title: 'Ready to Eat Meals' },
  { title: 'MREs' },
  { title: 'GRANOLA BARS' },
];

const CategoryCards = () => {
  return (
    <div className="cards-wrapper">
      {cardData.map((card, index) => (
        <Link
          key={index}
          href={{ pathname: '/shop', query: { category: card.title } }}
          className="category-card"
        >
          {iconMap[card.title]}
          <h3 className="category-title">{card.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCards;
