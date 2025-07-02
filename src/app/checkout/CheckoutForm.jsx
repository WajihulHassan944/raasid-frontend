'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import "./styles.css";
import { baseUrl } from '../const';
export default function CheckoutForm({ formData, onChange, handleSubmit, loading }) {
  const [cities, setCities] = useState([]);
const [showCityDropdown, setShowCityDropdown] = useState(false);
const [filteredCities, setFilteredCities] = useState([]);
useEffect(() => {
 const fetchCities = async () => {
  try {
    const res = await fetch(`${baseUrl}/cities/all-cities`);
    const data = await res.json();
    if (data.success) {
      const sortedCities = [...data.cities].sort((a, b) => a.localeCompare(b));
      setCities(sortedCities);
      setFilteredCities(sortedCities);
    }
  } catch (err) {
    console.error("Failed to fetch cities:", err);
  }
};


  fetchCities();
}, []);

useEffect(() => {
  const searchTerm = formData.city.toLowerCase();
  const filtered = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm)
  );
  setFilteredCities(filtered);
}, [formData.city, cities]);

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
<div className="form-row">
     <input
          type="text"
          placeholder="Full Name"
          required
          value={formData.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
        />
  </div>
  <div className="form-row">
    <input
      type="text"
      placeholder="House / Plot / Flat Number"
      required
      value={formData.house}
      onChange={(e) => onChange('house', e.target.value)}
    />
    <input
      type="text"
      placeholder="Street / Mohalla Name"
      required
      value={formData.street}
      onChange={(e) => onChange('street', e.target.value)}
    />
  </div>

  <div className="form-row">
    <input
      type="text"
      placeholder="Town / Village / Area Name"
      required
      value={formData.town}
      onChange={(e) => onChange('town', e.target.value)}
    />
    <input
      type="text"
      placeholder="Tehsil (Sub-district)"
      required
      value={formData.tehsil}
      onChange={(e) => onChange('tehsil', e.target.value)}
    />
  </div>

  <div className="form-row">
   <div className="city-search-wrapper" style={{ position: 'relative', width: '100%' }}>
  <input
    type="text"
    placeholder="Enter or select City"
    required
    value={formData.city}
    onChange={(e) => onChange('city', e.target.value)}
    onFocus={() => setShowCityDropdown(true)}
    onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)} // allow click on dropdown
  />
  {showCityDropdown && filteredCities.length > 0 && (
    <ul className="city-dropdown">
      {filteredCities.map((city, idx) => (
        <li
          key={idx}
          onClick={() => {
            onChange('city', city);
            setShowCityDropdown(false);
          }}
        >
          {city}
        </li>
      ))}
    </ul>
  )}
</div>
  </div>



<div className='form-row'>
  <select
      required
      value={formData.province}
      onChange={(e) => onChange('province', e.target.value)}
    >
      <option value="">Select Province</option>
      <option value="Punjab">Punjab</option>
      <option value="Sindh">Sindh</option>
      <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
      <option value="Balochistan">Balochistan</option>
      <option value="Islamabad Capital Territory">Islamabad</option>
      <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
      <option value="Azad Jammu and Kashmir">AJK</option>
    </select>
  <input
    className="numbers"
    type="tel"
    placeholder="03411095345"
    required
    value={formData.phone}
    onChange={(e) => onChange('phone', e.target.value)}
  />

</div>


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
