'use client';

import React, { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/app/redux/features/cartSlice';

const PopularProducts = ({ products }) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -250 : 250,
        behavior: 'smooth',
      });
    }
  };

  const handleAddToCart = (product) => {
    // 1️⃣ Add to Redux cart
    dispatch(addToCart({ ...product, quantity: 1 }));
    // 2️⃣ Redirect to /cart with productId query
    router.push(`/cart?productId=${product._id}`);
  };

  return (
    <>
      <div className="dashboard-products-header">
        <h2 className="dashboard-title">Popular Products</h2>
        <div className="flexed-div">
          <a href="/shop" className="dashboard-view-more">View More</a>
          <div className="categories-controls">
            <button onClick={() => scroll('left')} className="scroll-btn">
              <FiChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="scroll-btn">
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="products-wrapper">
        <div className="dashboard-products" ref={scrollRef}>
          {products.map((prod, i) => (
            <div key={i} className="dashboard-product-card">
              <img
                src={prod.image || prod.img}
                alt={prod.name}
                className="dashboard-product-img"
              />
              <h4 className="dashboard-product-name">{prod.name}</h4>
              <div className="dashboard-price-add">
                <span className="dashboard-product-price numbers">
                  {prod.price?.toFixed(2) || '0.00'} PKR
                </span>
                <button
                  className="dashboard-add-btn"
                  onClick={() => handleAddToCart(prod)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularProducts;
