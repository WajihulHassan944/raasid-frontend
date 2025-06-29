'use client';

import { usePathname } from 'next/navigation';
import AdminNav from './admin/AdminNav/page';
import TopNav from './admin/AdminNav/TopNav/TopNav';
import Navbar from './Navbar/Navbar';
import Footer from './footer/footer';
import ChatbaseWidget from './ChatbaseWidget';

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const isAdminLogin = pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin') && !isAdminLogin;

  return (
    <>
      {isAdminRoute && (
        <>
          <AdminNav />
          <TopNav />
        </>
      )}

      {!isAdminRoute && !isAdminLogin && <Navbar />}

      <main className={isAdminRoute ? 'admin-main' : ''}>
       
        {children}
      </main>

      {!isAdminRoute && !isAdminLogin && <Footer />}
    </>
  );
}
