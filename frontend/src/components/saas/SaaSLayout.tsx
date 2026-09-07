'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface SaaSLayoutProps {
  children: React.ReactNode;
  userName?: string;
  companyName?: string;
  notificationCount?: number;
}

export default function SaaSLayout({ 
  children, 
  userName, 
  companyName,
  notificationCount 
}: SaaSLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-luxury-dark">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-64">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          userName={userName}
          companyName={companyName}
          notificationCount={notificationCount}
        />
        
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
