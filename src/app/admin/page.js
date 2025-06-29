'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import AdminHomePage from "./AdminHome/page";
import AdminNav from "./AdminNav/page";
import TopNav from "./AdminNav/TopNav/TopNav";

import './admin.css';

export default function AdminPage() {
  const router = useRouter();

  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    // 🚫 Redirect if not logged in or not admin
    if (!user || !user.role?.includes('admin')) {
      router.replace('/home');
    }
  }, [user, router]);

  if (!user || !user.role?.includes('admin')) {
    return null; // ⏳ Optional: show a loader or blank while redirecting
  }

  return (
    <div className="admin-layout">
      <div className="top-nav">
        <TopNav />
      </div>
      <div className="main-layout">
        <div className="sidebar">
          <AdminNav />
        </div>
        <div className="admin-content">
          <AdminHomePage />
        </div>
      </div>
    </div>
  );
}
