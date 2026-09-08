'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  Home, 
  Plus, 
  MessageSquare, 
  Handshake, 
  FileText, 
  BarChart3, 
  Building, 
  ShieldCheck, 
  Bell, 
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: any;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/saas/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Listings',
    href: '/saas/listings',
    icon: Building2,
    children: [
      { label: 'All', href: '/saas/listings', icon: null },
      { label: 'Active', href: '/saas/listings?status=active', icon: null },
      { label: 'Drafts', href: '/saas/listings?status=draft', icon: null },
      { label: 'Reserved', href: '/saas/listings?status=reserved', icon: null },
      { label: 'Sold', href: '/saas/listings?status=sold', icon: null },
      { label: 'Under Construction', href: '/saas/listings?status=under_construction', icon: null },
    ],
  },
  {
    label: 'Add Property',
    href: '/saas/listings/new',
    icon: Plus,
  },
  {
    label: 'Inquiries',
    href: '/saas/inquiries',
    icon: MessageSquare,
  },
  {
    label: 'Negotiations',
    href: '/saas/negotiations',
    icon: Handshake,
  },
  {
    label: 'Agreements',
    href: '/saas/agreements',
    icon: FileText,
  },
  {
    label: 'Documents',
    href: '/saas/documents',
    icon: FileText,
  },
  {
    label: 'Analytics',
    href: '/saas/analytics',
    icon: BarChart3,
  },
  {
    label: 'Company Profile',
    href: '/saas/company',
    icon: Building,
  },
  {
    label: 'Verification',
    href: '/saas/company/verification',
    icon: ShieldCheck,
  },
  {
    label: 'Notifications',
    href: '/saas/notifications',
    icon: Bell,
  },
  {
    label: 'Settings',
    href: '/saas/settings',
    icon: Settings,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['Listings']));

  const toggleExpanded = (label: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(label)) {
      newExpanded.delete(label);
    } else {
      newExpanded.add(label);
    }
    setExpandedItems(newExpanded);
  };

  const isActive = (href: string) => {
    if (href === '/saas/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-luxury-charcoal border-r border-luxury-border
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-luxury-border">
          <Link href="/saas/dashboard" className="flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-luxury-gold" />
            <span className="font-display text-xl font-bold text-white tracking-wide">
              BETAPP
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-luxury-textMuted hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-73px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.has(item.label);
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={item.label}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-lg
                        transition-colors duration-200
                        ${isActive(item.href)
                          ? 'bg-luxury-gold/10 text-luxury-gold'
                          : 'text-luxury-textMuted hover:text-white hover:bg-luxury-muted'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        {Icon && <Icon className="w-5 h-5" />}
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className={`
                              block px-4 py-2 rounded-lg text-sm
                              transition-colors duration-200
                              ${isActive(child.href)
                                ? 'text-luxury-gold'
                                : 'text-luxury-textMuted hover:text-white'
                              }
                            `}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg
                      transition-colors duration-200
                      ${isActive(item.href)
                        ? 'bg-luxury-gold/10 text-luxury-gold'
                        : 'text-luxury-textMuted hover:text-white hover:bg-luxury-muted'
                      }
                    `}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
