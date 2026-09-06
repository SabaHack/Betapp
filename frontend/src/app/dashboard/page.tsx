'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Building2, Heart, Clock, User, LogOut } from 'lucide-react';
import { userPropertyService } from '@/services/propertyService';
import { Property } from '@/types/property';
import PropertyCard from '@/components/PropertyCard';

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Property[]>([]);
  const [activeTab, setActiveTab] = useState<'saved' | 'recent'>('saved');

  useEffect(() => {
    // Check for logged in user
    const userData = localStorage.getItem('betapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load user data
    setSavedProperties(userPropertyService.getSavedProperties());
    setRecentlyViewed(userPropertyService.getRecentlyViewed());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('betapp_user');
    window.location.href = '/';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-luxury-dark flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <Building2 className="w-16 h-16 text-luxury-gold mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold text-white mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-luxury-textMuted mb-8">
            Sign in to access your saved properties, inquiries, and more.
          </p>
          <div className="space-y-4">
            <Link href="/auth/login" className="btn-primary block">
              Sign In
            </Link>
            <Link href="/auth/register" className="btn-secondary block">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-dark">
      {/* Header */}
      <div className="bg-luxury-charcoal border-b border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-luxury-black" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-white">
                  Welcome, {user.name}
                </h1>
                <p className="text-luxury-textMuted">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-luxury-textMuted hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-luxury-surface border border-luxury-border p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <p className="text-luxury-textMuted text-sm">Saved Properties</p>
                <p className="text-2xl font-bold text-white">{savedProperties.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-luxury-surface border border-luxury-border p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <p className="text-luxury-textMuted text-sm">Recently Viewed</p>
                <p className="text-2xl font-bold text-white">{recentlyViewed.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-luxury-surface border border-luxury-border p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <p className="text-luxury-textMuted text-sm">My Listings</p>
                <p className="text-2xl font-bold text-white">
                  {userPropertyService.getMyListings().length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-luxury-border mb-8">
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'saved'
                ? 'border-luxury-gold text-luxury-gold'
                : 'border-transparent text-luxury-textMuted hover:text-white'
            }`}
          >
            <Heart className="w-5 h-5 mr-2" />
            Saved Properties
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'recent'
                ? 'border-luxury-gold text-luxury-gold'
                : 'border-transparent text-luxury-textMuted hover:text-white'
            }`}
          >
            <Clock className="w-5 h-5 mr-2" />
            Recently Viewed
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === 'saved' && savedProperties.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Heart className="w-12 h-12 text-luxury-textMuted mx-auto mb-4" />
              <h3 className="font-display text-xl text-white mb-2">No saved properties</h3>
              <p className="text-luxury-textMuted mb-4">
                Start browsing and save properties you like
              </p>
              <Link href="/properties" className="btn-secondary">
                Browse Properties
              </Link>
            </div>
          )}

          {activeTab === 'recent' && recentlyViewed.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Clock className="w-12 h-12 text-luxury-textMuted mx-auto mb-4" />
              <h3 className="font-display text-xl text-white mb-2">No recently viewed</h3>
              <p className="text-luxury-textMuted mb-4">
                Properties you view will appear here
              </p>
              <Link href="/properties" className="btn-secondary">
                Browse Properties
              </Link>
            </div>
          )}

          {(activeTab === 'saved' ? savedProperties : recentlyViewed).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}