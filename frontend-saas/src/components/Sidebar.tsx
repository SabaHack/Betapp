'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Building2, MessageSquare, FileText, BarChart3, Bell, Settings, Users, ChevronDown, LogOut, Menu, X, CheckCircle } from 'lucide-react';
import { saasService } from '@/services/saasService';

const navItems = [
  { href: '/saas', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/saas/listings', label: 'Listings', icon: Building2 },
  { href: '/saas/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/saas/agreements', label: 'Agreements', icon: FileText },
  { href: '/saas/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/saas/company', label: 'Company', icon: Users },
];

const bottomNavItems = [
  { href: '/saas/notifications', label: 'Notifications', icon: Bell },
  { href: '/saas/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState(saasService.getCurrentUser());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadCount = saasService.getUnreadCount();

  const handleLogout = () => { saasService.logout(); window.location.href = '/saas'; };

  return (
    <>
      {/* Mobile Toggle */}
      <button className="md:hidden fixed top-4 left-4 z-50 p-2 bg-luxury-charcoal border border-luxury-border" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-luxury-charcoal border-r border-luxury-border w-64 z-40 transform transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-luxury-border">
          <Link href="/saas" className="flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-luxury-gold" />
            <span className="font-display text-xl font-bold text-white">BETAPP</span>
          </Link>
        </div>

        {/* User */}
        {user && (
          <div className="p-4 border-b border-luxury-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center"><span className="text-luxury-black font-semibold">{user.name.charAt(0)}</span></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium text-white truncate">{user.name}</p><p className="text-xs text-luxury-textMuted truncate">{user.email}</p></div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="p-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className={`flex items-center px-4 py-3 text-sm rounded-none transition-colors ${pathname === item.href ? 'bg-luxury-gold text-luxury-black' : 'text-luxury-textMuted hover:bg-luxury-surface hover:text-white'}`}>
              <item.icon className="w-5 h-5 mr-3" />{item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-luxury-border">
          {bottomNavItems.map(item => (
            <Link key={item.href} href={item.href} className={`flex items-center px-4 py-3 text-sm rounded-none transition-colors ${pathname === item.href ? 'bg-luxury-gold text-luxury-black' : 'text-luxury-textMuted hover:bg-luxury-surface hover:text-white'}`}>
              <item.icon className="w-5 h-5 mr-3" />{item.label}
              {item.href === '/saas/notifications' && unreadCount > 0 && <span className="ml-auto bg-luxury-gold text-luxury-black text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>}
            </Link>
          ))}
          <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-sm text-luxury-textMuted hover:bg-luxury-surface hover:text-white rounded-none transition-colors">
            <LogOut className="w-5 h-5 mr-3" />Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}