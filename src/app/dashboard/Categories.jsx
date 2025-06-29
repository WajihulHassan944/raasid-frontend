'use client';
import React, { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Categories = ({ categories }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="categories-header">
        <h2 className="dashboard-title">Top Categories</h2>
        <div className="categories-controls">
          <button onClick={() => scroll('left')} className="scroll-btn">
            <FiChevronLeft size={20} />
          </button>
          <button onClick={() => scroll('right')} className="scroll-btn">
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="categories-wrapper">
        <div className="categories-scroll" ref={scrollRef}>
          {categories.map((cat, i) => (
            <div
              key={i}
              className="category-card"
              style={{ backgroundColor: cat.bg }}
            >
              <div className="category-icon">
                <img src={cat.image} alt={cat.title} />
              </div>
              <p>{cat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
