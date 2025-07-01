'use client';
import React, { useState, useRef, useEffect } from 'react';
import './TopNav.css';
import { FaSearch, FaUser } from 'react-icons/fa';
import { FiBell, FiMoreVertical } from "react-icons/fi";
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/app/redux/features/userSlice';
import { useRouter } from 'next/navigation';

const TopNav = () => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

 const handleLogout = () => {
  dispatch(logout());
  setDropdownOpen(false);
  router.push('/home');
};

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="topnav">
      <div className="topnav-more">
        <FiMoreVertical className="topNavIcon" />
      </div>

      {/* <div className="topnav-left">
        <FaSearch className="icon-three" />
      </div> */}

      <div className="topnav-right">
        <div className="topnavbar-icons">
          {/* <Link href="/admin/messages">
            <div className="icon-with-badge-topnav">
              <HiOutlineChatBubbleLeftRight className="icon-topnav" />
              <span className="badge-topnav">2</span>
            </div>
          </Link>

          <Link href="/admin/notifications">
            <div className="icon-with-dot-topnav">
              <FiBell className="icon-topnav" />
              <span className="dot-topnav"></span>
            </div>
          </Link> */}

          {/* User Icon / Dropdown */}
          <div className="user-dropdown-topnav" ref={dropdownRef}>
            {user ? (
              <div
                className="user-initial-topnav"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                {user.firstName?.[0]?.toUpperCase() || 'U'}
              </div>
            ) : (
              <Link href="/login">
                <FaUser className="icon-topnav" />
              </Link>
            )}
            {dropdownOpen && (
              <div className="dropdown-menu-topnav">
                <p className="dropdown-item">Hi, {user?.firstName}</p>
                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
