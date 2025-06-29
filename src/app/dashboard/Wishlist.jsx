import React from 'react';

const Wishlist = ({ items }) => (
  <>
    {items.map((prod, i) => (
      <div key={i} className="dashboard-wishlist-card">
        <img src={prod.img} alt={prod.name} className="dashboard-wishlist-img" />
        <div className="dashboard-wishlist-info">
          <h4>{prod.name}</h4>
          <p className="dashboard-product-price numbers">{prod.price.toFixed(2)}PKR</p>
        </div>
        <button className="dashboard-wishlist-remove">🗑</button>
      </div>
    ))}
  </>
);

export default Wishlist;