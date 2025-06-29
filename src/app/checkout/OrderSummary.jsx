'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import './styles.css';

export default function OrderSummary({ shippingFee, weight }) {
  const items = useSelector((state) => state.cart.items);

  const getSubtotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const getGrandTotal = () => {
    return getSubtotal() + shippingFee;
  };

  return (
    <aside className="order-summary">
      <h3>Order Summary</h3>

      {items.map((item) => (
        <div className="item" key={item._id}>
          <div className="image-wrapper">
            <img src={item.image} alt={item.name} />
            <span className="item-qty numbers">{item.quantity}</span>
          </div>
          <div className="item-details">
            <div className="item-row">
              <strong>{item.name}</strong>
              <strong className='numbers'>{(item.price * item.quantity).toFixed(2)}PKR</strong>
            </div>
            <p className="desc">{item.description?.slice(0, 100)}...</p>
          </div>
        </div>
      ))}

      <div className="price numbers">
        <p>
          Subtotal <strong>{getSubtotal().toFixed(2)}PKR</strong>
        </p>
        <p>
          Shipping Fee <strong>{shippingFee.toFixed(2)}PKR</strong>
        </p>
         <p>
          Total Weight <strong>{weight}g</strong>
        </p>
        <p className="total-p numbers">
          Grand Total <strong>{getGrandTotal().toFixed(2)}PKR</strong>
        </p>
      </div>
    </aside>
  );
}
