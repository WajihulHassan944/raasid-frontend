'use client'; // only if you're using it in a Client Component

import React from 'react';
import Link from 'next/link';
import {
  FaJar,
  FaUtensils,
  FaBoxOpen,
  FaCookieBite,
} from 'react-icons/fa6';
import './CategoryCards.css';

const iconMap = {
  'Fruits Preserves': <FaJar />,
  'Ready to Eat Meals': <FaUtensils />,
  'MREs': <FaBoxOpen />,
  'GRANOLA BARS': <FaCookieBite />,
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
          <div className="category-icon">
            {iconMap[card.title] || <FaBoxOpen />}
          </div>
          <h3 className="category-title">{card.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCards;
