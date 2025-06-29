'use client';
import React from 'react';
import './ContactInfo.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelopeOpen, FaRegClock } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <section className="contact-info-section">
      <div className="contact-info-card">
        <div className="info-1">
          <div className="icon"><FaMapMarkerAlt /></div>
          <h3>Address</h3>
        </div>
        <p className="subtitle">Visit us at:</p>
        <p>Rawat Technology Park</p>
        <p>Islamabad, Pakistan</p>
      </div>

      <div className="contact-info-card">
        <div className="info-1">
          <div className="icon"><FaPhoneAlt /></div>
          <h3>Call Us </h3>
        </div>
        <p className="subtitle">Call us on:</p>
        <p className='numbers'>+92 311 1188837</p>
      </div>

      <div className="contact-info-card">
        <div className="info-1">
          <div className="icon"><FaEnvelopeOpen /></div>
          <h3>Email Us</h3>
        </div>
        <p className="subtitle">Mail address:</p>
        <p>info@raasid.com</p>
      </div>

      <div className="contact-info-card">
        <div className="info-1">
          <div className="icon"><FaRegClock /></div>
          <h3>Office Hours</h3>
        </div>
        <p className="subtitle">Opening Time:</p>
        <p>Mon – Fri : 9:00 AM – 6:00 PM</p>
        <p>Sunday: Closed</p>
      </div>
    </section>
  );
};

export default ContactInfo;
