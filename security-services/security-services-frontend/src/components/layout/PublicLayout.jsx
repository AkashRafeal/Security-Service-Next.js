'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const PublicLayout = ({ children }) => {
  const pathname = usePathname();
  const hideFooter = pathname === '/login' || pathname === '/register';

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-gold-500 selection:text-white">
      <Navbar />
      <main className="flex-grow pt-[58px] sm:pt-[64px] lg:pt-[94px]">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default PublicLayout;
