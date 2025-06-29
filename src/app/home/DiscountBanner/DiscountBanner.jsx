import React from 'react';
import "./DiscountBanner.css";
import Link from 'next/link';

const DiscountBanner = () => {
  return (
    <div className="discount-banner">
      <div className="discount-content">
        <p className="discount-tag">LIMITED TIME OFFER</p>
        <h2 className="discount-heading">Premium Food, Special Price</h2>
        <p className="discount-subtext">
          Enjoy exclusive discounts on Raasid’s ready-to-eat meals, juices, and spices.
        </p>
        <Link href="/shop">
          <button className="shop-btn">SHOP NOW →</button>
        </Link>
      </div>
    </div>
  );
};

export default DiscountBanner;
