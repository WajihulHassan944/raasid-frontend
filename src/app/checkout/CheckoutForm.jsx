'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import "./styles.css";

export default function CheckoutForm({ formData, onChange, handleSubmit, loading }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("https://raasid-backend.vercel.app/api/cities/all-cities");
        const data = await res.json();
        if (data.success) {
          setCities(data.cities);
        }
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    };

    fetchCities();
  }, []);

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <section>
        <h2>Contact Information</h2>
        <input
          type="email"
          placeholder="Email address"
          required
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </section>

      <section>
        <h2>Shipping Details</h2>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={formData.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          required
          value={formData.address}
          onChange={(e) => onChange('address', e.target.value)}
        />

        {/* City dropdown */}
        <select
          required
          value={formData.city}
          onChange={(e) => onChange('city', e.target.value)}
        >
          <option value="">Select a city</option>
          {cities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>

        <input
          className="numbers"
          type="tel"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
        />
      </section>

      <section>
        <h2>Shipping Method</h2>
        <select
          required
          value={formData.shippingMethod}
          onChange={(e) => onChange('shippingMethod', e.target.value)}
        >
          <option value="">Select a shipping method</option>
          <option value="TCS">TCS</option>
          <option value="Pakistan Post">Pakistan Post</option>
        </select>
      </section>

      <section>
        <h2>Payment Method</h2>
        <select
          required
          value={formData.paymentMethod}
          onChange={(e) => onChange('paymentMethod', e.target.value)}
        >
          <option value="">Select a payment method</option>
          <option value="cod">Cash on Delivery</option>
          {/* <option value="card">Card Payment</option> */}
        </select>
      </section>

      <div className="order-footer">
        <div className="footer-actions">
          <Link href="/cart" className="return-link">
            <FaArrowLeft className="arrow-icon" /> Return to Cart
          </Link>

          <button type="submit" className="place-order-btn" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </form>
  );
}
