import React from 'react';
import TopBanner from './TopBanner';
import MiddleSection from './MiddleSection';
import BottomNav from './BottomNav';
import './navbar.css';

const Navbar = () => {
  return (
    <header className="navbar-container">
      <TopBanner />
      <MiddleSection />
      <BottomNav />
    </header>
  );
};

export default Navbar;
