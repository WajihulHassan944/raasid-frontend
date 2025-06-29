// components/Footer.jsx
'use client';
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import "./footer.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="main-container">
        <div className="footer-container">
          {/* About Company */}
          <div className="footer-column">
            <h3>ABOUT RAASID</h3>
            <p>
              RAASID blends tradition and innovation to deliver premium, ready-to-enjoy food products that celebrate quality, connection, and flavor.
            </p>
          </div>

          {/* Useful Links */}
          <div className="footer-column">
            <h3>EXPLORE</h3>
            <ul>
              <li><Link href="/home">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/TermsAndConditions">Terms And Condition</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/faqs">FAQ's</Link></li>
            </ul>
          </div>

          {/* Categories with dynamic links */}
          <div className="footer-column">
            <h3>CATEGORIES</h3>
            <ul>
              <li><Link href={{ pathname: "/shop", query: { category: "Fruits Preserves" } }}>Fruits Preserves</Link></li>
              <li><Link href={{ pathname: "/shop", query: { category: "Ready to Eat Meals" } }}>Ready to Eat Meals</Link></li>
              <li><Link href={{ pathname: "/shop", query: { category: "MREs" } }}>MRE's</Link></li>
              <li><Link href={{ pathname: "/shop", query: { category: "Granola Bars" } }}>Granola Bars</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column">
            <h3>CONTACT DETAILS</h3>
            <ul>
              <li><Link href="/contact">Visit Us</Link></li>
              <li className="numbers"><Link href="/contact">+92 311 1188837</Link></li>
              <li><Link href="/contact">info@raasid.com</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <div className="footer-socials">
          <a href="https://www.facebook.com/RaasidOfficial" className="icon" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" className="icon" aria-label="TikTok"><FaTiktok /></a>
          <a href="https://www.instagram.com/raasidofficial?igsh=MWltNDNhbnBvN29ydQ==" className="icon" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" className="icon" aria-label="YouTube"><FaYoutube /></a>
        </div>

        <div className="logo-3">
          <img
            src="/RaasidLogo.svg"
            alt="Shoppable Grocery Store"
            style={{ width: "50%", height: 'auto' }}
          />
        </div>

        <div className="copyright">
          Copyright © 2025
        </div>
      </div>
    </footer>
  );
};

export default Footer;
