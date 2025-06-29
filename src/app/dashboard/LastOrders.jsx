import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

const LastOrders = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <p className="no-orders-msg">No orders to display.</p>;
  }

  return (
    <div className="dashboard-orders-wrapper">
      {orders.map((order, i) => {
        const product = order.products[0]?.productId || {};
        const quantity = order.products[0]?.quantity || 1;

        return (
          <div key={i} className="dashboard-order-card">
            <img
              src={product.image || '/assets/default.png'}
              alt={product.name || 'Product Image'}
              className="dashboard-order-img"
              loading="lazy"
            />
            <div className="dashboard-order-info">
              <h4>{product.name || 'Unnamed Product'}</h4>
              <p>Weight: {product.packaging || 'N/A'}</p>
              <p className="dashboard-order-qty">
                <FiShoppingCart className="dashboard-cart-icon numbers" />{' '}
                {quantity} item{quantity > 1 ? 's' : ''}
              </p>
              <p className="order-status">
                Status: <span className={`status ${order.status?.toLowerCase()}`}>{order.status}</span>
              </p>
              <p className="order-date">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className="dashboard-order-price numbers">
              Total: {order.totalAmount?.toLocaleString() || 0} PKR
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default LastOrders;
