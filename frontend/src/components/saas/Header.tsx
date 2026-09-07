'use client';

import { Bell, Search, User, LogOut, Menu, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
  userName?: string;
  companyName?: string;
  notificationCount?: number;
}

export default function Header({ 
  onMenuClick, 
  userName = 'John Doe', 
  companyName = 'Ethiopian Prime Properties',
  notificationCount = 3
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('betapp_user');
    window.location.href = '/auth/login';
  };

  return (
    <header className="bg-luxury-charcoal border-b border-luxury-border sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Left: Mobile menu button + Search */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-luxury-textMuted hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center bg-luxury-surface border border-luxury-border rounded-lg px-4 py-2 w-64">
            <Search className="w-5 h-5 text-luxury-textMuted mr-2" />
            <input
              type="text"
              placeholder="Search properties..."
              className="bg-transparent border-none outline-none text-white placeholder-luxury-textMuted text-sm w-full"
            />
          </div>
        </div>

        {/* Right: Notifications + User */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Link
            href="/saas/notifications"
            className="relative text-luxury-textMuted hover:text-white transition-colors"
          >
            <Bell className="w-6 h-6" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-luxury-gold text-luxury-black text-xs font-bold rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 text-luxury-textMuted hover:text-white transition-colors"
            >
              <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-luxury-black" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-white">{userName}</p>
                <p className="text-xs text-luxury-textMuted">{companyName}</p>
              </div>
            </button>

            {/* Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-luxury-surface border border-luxury-border rounded-lg shadow-lg py-2 z-50">
                <Link
                  href="/saas/settings"
                  className="block px-4 py-2 text-sm text-luxury-textMuted hover:text-white hover:bg-luxury-muted"
                  onClick={() => setShowUserMenu(false)}
                >
                  Settings
                </Link>
                <Link
                  href="/saas/company"
                  className="block px-4 py-2 text-sm text-luxury-textMuted hover:text-white hover:bg-luxury-muted"
                  onClick={() => setShowUserMenu(false)}
                >
                  Company Profile
                </Link>
                <hr className="border-luxury-border my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-luxury-error hover:bg-luxury-muted flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
