'use client';
import React, { useEffect, useState } from 'react';
import './AdminHomeCards.css';
import Image from 'next/image';
import { baseUrl } from '@/app/const'; // Make sure baseUrl is defined in const.js

const AdminHomeCards = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${baseUrl}/courier/get-all-analytics`);
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        } else {
          console.error("Failed to fetch stats");
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="adminHomeCardsContainer">
      <div className="adminHomeCard reports">
        <div className="icon-four">
          <Image src='/assets/admin/icon-connect.svg' alt="icon" width={50} height={50} />
        </div>
        <h4>Total Orders</h4>
        <p>{stats?.totalOrders ?? 0}</p>
      </div>

      <div className="adminHomeCard payroll">
        <div className="icon-four">
          <Image src='/assets/admin/icon-speech-bubble.svg' alt="icon" width={50} height={50} />
        </div>
        <h4>Pending Orders</h4>
        <p>{stats?.pendingOrders ?? 0}</p>
      </div>

      <div className="adminHomeCard events">
        <div className="icon-four">
          <Image src='/assets/admin/icon-favorites.svg' alt="icon" width={50} height={50} />
        </div>
        <h4>Delivered Orders</h4>
        <p>{stats?.deliveredOrders ?? 0}</p>
      </div>

      <div className="adminHomeCard projects">
        <div className="icon-four">
          <Image src='/assets/admin/icon-mailbox.svg' alt="icon" width={50} height={50} />
        </div>
        <h4>Total Products</h4>
        <p>{stats?.totalProducts ?? 0}</p>
      </div>

      <div className="adminHomeCard clients">
        <div className="icon-four">
          <Image src='/assets/admin/icon-briefcase.svg' alt="icon" width={50} height={50} />
        </div>
        <h4>Total Categories</h4>
        <p>{stats?.totalCategories ?? 0}</p>
      </div>

      <div className="adminHomeCard employees">
        <div className="icon-four">
          <Image src='/assets/admin/icon-user-male.svg' alt="icon" width={50} height={50} />
        </div>
        <h4>Inquiries</h4>
        <p>{stats?.totalInquiries ?? 0}</p>
      </div>
    </div>
  );
};

export default AdminHomeCards;
