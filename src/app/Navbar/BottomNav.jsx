'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Link from 'next/link';
import { baseUrl } from '@/app/const';
import './navbar.css';
import { FaUser, FaShoppingBag } from 'react-icons/fa';
import { FiSearch, FiPhone } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/userSlice';

const BottomNav = () => {
   const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
    const items = useSelector((state) => state.cart.items);
    const cartCount = items.length;
     const cartTotalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

const user = useSelector((state) => state.user.userData);
   const dropdownRef = useRef(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fullUrl = `${baseUrl}/category`;
        console.log("📦 Fetching categories from:", fullUrl);

        const res = await fetch(fullUrl);
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };
  return (
    <nav className="bottom-nav">
      {/* Left - Categories button */}
      <div className="dropdown-wrapper">
        <button
          className="categories-btn"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FaBars style={{ marginRight: '8px' }} />
          CATEGORIES{' '}
          {dropdownOpen ? (
            <FiChevronUp style={{ marginLeft: '6px' }} />
          ) : (
            <FiChevronDown style={{ marginLeft: '6px' }} />
          )}
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <ul className="dropdown-menu">
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.categoryName)}`}
                  onClick={() => setDropdownOpen(false)} // optional: close dropdown on click
                >
                  {cat.categoryName}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Burger Icon (Mobile Only) */}
      <div className="bottom-burger-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars size={22} />
      </div>

      {/* Nav Links */}
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link href="/home">HOME</Link></li>
        <li><Link href="/about">ABOUT US</Link></li>
        <li><Link href="/shop">SHOP</Link></li>
        <li><Link href="/tour">360 TOUR</Link></li>
        <li><Link href="/contact">CONTACT</Link></li>
<div className='desktopDisplayNone'>
              <div className="phone">
        <FiPhone size={22} className="icon-one" />
        <div>
          <small>CALL US NOW</small>
          <strong className="numbers" style={{ fontWeight: "600" }}>+92 370 2333125</strong>
        </div>
      </div>

      <div className="contact-icons">
        {user ? (
          <div className="user-dropdown" ref={dropdownRef}>
            <div className="user-initial" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {user.firstName?.[0]?.toUpperCase() || 'U'}
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p className="dropdown-item">Hi, {user.firstName}</p>
                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <FaUser className="icon-one" onClick={() => setMenuOpen(false)} />
          </Link>
        )}

        <div className="cart-1">
          <Link href="/cart">
            <div className="cart-icon-wrapper">
              <FaShoppingBag className="icon-one" />
              <span className="cart-count numbers">{cartCount}</span>
            </div>
          </Link>
          <span className="cart-price numbers">{cartTotalPrice} PKR</span>
        </div>
      </div>
      </div>
      </ul>




      {/* Shop Now Button */}
      <Link href="/shop" className='toDisplayNone'>
        <button className="shop-now-btn-1">SHOP NOW</button>
      </Link>
    </nav>
  );
};

export default BottomNav;
