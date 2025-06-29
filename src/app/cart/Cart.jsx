'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // ✅ for navigation
import { FaMinus, FaPlus } from 'react-icons/fa';
import './cartstyles.css';
import {
  updateQuantity,
  removeFromCart,
} from '@/app/redux/features/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const items = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // ✅ auth state

  const handleIncrement = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrement = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const getTotalPrice = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
      router.push('/checkout');
  };

  return (
    <section className="cart-section">
      <div className="container">
        <h1 className="cart-title">Cart</h1>

        {items.length === 0 ? (
          <p style={{ padding: '2rem 13.5%', display: 'flex', justifyContent: 'center' }}>Your cart is empty.</p>
        ) : (
          <div className="cart-wrapper">
            <div className="cart-left">
              <table className="cart-table">
                <thead>
                  <tr className="tr-row" style={{ borderBottom: "1px solid hsla(0, 0%, 7%, 0.11)" }}>
                    <th>Product</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td className="product-info">
                        <img src={item.image} alt={item.name} className="product-img" />
                        <div className="product-details">
                          <h3>{item.name}</h3>
                          <p className="new-price numbers">{item.price}PKR</p>
                          <p className="product-desc">{item.description.slice(0, 100)}...</p>
                          <div className="quantity-control numbers">
                            <button onClick={() => handleDecrement(item._id, item.quantity)}>
                              <FaMinus />
                            </button>
                            <input type="text" value={item.quantity} readOnly />
                            <button onClick={() => handleIncrement(item._id, item.quantity)}>
                              <FaPlus />
                            </button>
                          </div>
                          <button className="remove-btn" onClick={() => handleRemove(item._id)}>
                            Remove item
                          </button>
                        </div>
                      </td>
                      <td className="product-total numbers">{(item.price * item.quantity).toFixed(2)}PKR</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-right">
              <div className="cart-totals">
                <h3>Cart Totals</h3>
                <div className="subtotal numbers">
                  <span>Subtotal</span>
                  <span>{getTotalPrice()}PKR</span>
                </div>
              {/*   <div className="total numbers">
                  <strong>Total</strong>
                  <strong>{getTotalPrice()}PKR</strong>
                </div> */}
                <button className="checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
