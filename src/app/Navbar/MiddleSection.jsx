'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FaUser, FaShoppingBag } from 'react-icons/fa';
import { FiSearch, FiPhone } from "react-icons/fi";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/app/redux/features/userSlice';
import { baseUrl } from '@/app/const';
import './navbar.css';

const MiddleSection = () => {
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const items = useSelector((state) => state.cart.items);
  const cartCount = items.length;
  const cartTotalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/products/all`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/category`);
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

useEffect(() => {
  const fetchFilteredProducts = async () => {
    try {
      let query = [];
      if (selectedCategory) {
        query.push(`category=${encodeURIComponent(selectedCategory)}`);
      }
      if (searchTerm) {
        query.push(`search=${encodeURIComponent(searchTerm)}`);
      }

      const queryString = query.length ? `?${query.join('&')}` : '';
      const res = await fetch(`${baseUrl}/products/all${queryString}`);
      const data = await res.json();

      if (data.success) {
        setFilteredProducts(data.products);
      } else {
        setFilteredProducts([]);
      }
    } catch (err) {
      console.error('Failed to fetch filtered products:', err);
      setFilteredProducts([]);
    }
  };

  fetchFilteredProducts();
}, [searchTerm, selectedCategory]);


useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);     // for user menu
      setShowDropdown(false);     // for product dropdown
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  return (
    <div className="middle-section">
      <Link href="/home">
        <div className="logo-1">
          <img src="/RaasidLogo.svg" alt="Raasid" />
        </div>
      </Link>

  <div className="search-bar-wrapper" ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>

  <div className="search-bar">
 <input
  type="text"
  placeholder="Search..."
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  }}
/>

<select
  value={selectedCategory}
  onChange={(e) => {
    setSelectedCategory(e.target.value);
    setShowDropdown(true);
  }}
>

      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat._id} value={cat.categoryName}>
          {cat.categoryName}
        </option>
      ))}
    </select>
    <button className="search-btn">
      <FiSearch />
    </button>
  </div>

{showDropdown && (
  <div className="product-dropdown">
    {filteredProducts.slice(0, 4).map((product) => (
      <Link
        href={`/productdetails?productId=${product._id}`}
        key={product._id}
        className="product-dropdown-item-link"
        onClick={() => {
          setSearchTerm('');
          setSelectedCategory('');
          setShowDropdown(false);
        }}
      >
        <div className="product-dropdown-item">
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h4>{product.name}</h4>
            {product.price === 0 ? (
              <div className="out-of-stock-label">Out of Stock</div>
            ) : (
              <p className="price numbers">{product.price} PKR</p>
            )}
          </div>
        </div>
      </Link>
    ))}
    {filteredProducts.length === 0 && (
      <div className="no-results">No products found</div>
    )}
  </div>
)}

</div>
<div className='toDisplayNone'>
      <div className="phone">
        <FiPhone size={22} className="icon-one" />
        <div>
          <small>CALL US NOW</small>
          <strong className="numbers" style={{ fontWeight: "600" }}>+92-311-1188837</strong>
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
                <Link
          href={
            user.role?.includes('admin') || user.role?.includes('subadmin')
              ? '/admin'
              : '/dashboard'
          }
          className="dropdown-item link"
        >
          Dashboard
        </Link>
                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <FaUser className="icon-one" />
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
    </div>
  );
};

export default MiddleSection;
