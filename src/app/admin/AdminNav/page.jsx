'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { MdCategory } from 'react-icons/md';
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaShippingFast,
  FaEnvelope,
  FaExchangeAlt,
  FaHome,
  FaBell
} from 'react-icons/fa';
import { TiUserAdd } from "react-icons/ti";
import './adminNav.css';

const AdminNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useSelector((state) => state.user.userData); // 👈 get user from Redux
  console.log("user is",user);

  return (
    <>
      <div className="mobile-header">
        <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <img src="/RaasidLogo.svg" className="mobile-logo" alt="Raasid Logo" />
      </div>

      <aside className={`admin-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <img src="/RaasidLogo.svg" alt="Modernize Logo" className="logo" />
          <span className="brand-name">Raasid</span>
        </div>

        <nav className="nav-sections">
          <div className="nav-group">
            <ul>
              <li>
                <Link href="/admin">
                  <FaHome className="icon-three" /> <span>Home</span>
                </Link>
              </li>

              {/* ✅ Only show if user role is 'admin' */}
              {user?.role.includes('admin') && (
               <>
                <li>
                  <Link href="/admin/addadmin">
                    <TiUserAdd className="icon-three" /> <span>Add Admin</span>
                  </Link>
                </li>
             
              <li>
                <Link href="/admin/manage-categories">
                  <MdCategory className="icon-three" /> <span>Categories</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/addproducts">
                  <FaShoppingCart className="icon-three" /> <span>Add Products</span>
                </Link>
              </li>
</>
               )}

              <li>
                <Link href="/admin/sales">
                  <FaExchangeAlt className="icon-three" /> <span>Manage Orders</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/adminmessages">
                  <FaEnvelope className="icon-three" /> <span>Contact Messages</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/shippingfeecal">
                  <FaShippingFast className="icon-three" /> <span>Shipping Fee Calculation</span>
                </Link>
              </li>
              {/* <li>
                <Link href="/admin/notifications">
                  <FaBell className="icon-three" /> <span>Notifications</span>
                </Link>
              </li> */}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default AdminNav;
