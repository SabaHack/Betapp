'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, Plus, Edit, Trash2, Eye, User, LogOut } from 'lucide-react';
import { userPropertyService } from '@/services/propertyService';
import { Property } from '@/types/property';

export default function SellerDashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [listings, setListings] = useState<Property[]>([]);

  useEffect(() => {
    // Check for logged in user
    const userData = localStorage.getItem('betapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load listings
    setListings(userPropertyService.getMyListings());
  }, []);

  const handleDelete = (propertyId: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      userPropertyService.deleteListing(propertyId);
      setListings(userPropertyService.getMyListings());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('betapp_user');
    window.location.href = '/';
  };

  const formatPrice = (price: number, listingType: string) => {
    if (listingType === 'rent') {
      return `ETB ${price.toLocaleString()}/mo`;
    }
    return `ETB ${price.toLocaleString()}`;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-luxury-dark flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <Building2 className="w-16 h-16 text-luxury-gold mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold text-white mb-4">
            Seller Dashboard
          </h1>
          <p className="text-luxury-textMuted mb-8">
            Sign in to manage your property listings.
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
                  Seller Dashboard
                </h1>
                <p className="text-luxury-textMuted">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/seller/properties/new" className="btn-primary flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add Property
              </Link>
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
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-luxury-surface border border-luxury-border p-6">
            <p className="text-luxury-textMuted text-sm">Total Listings</p>
            <p className="text-3xl font-bold text-white">{listings.length}</p>
          </div>
          <div className="bg-luxury-surface border border-luxury-border p-6">
            <p className="text-luxury-textMuted text-sm">Active</p>
            <p className="text-3xl font-bold text-luxury-success">
              {listings.filter(l => l.status === 'active').length}
            </p>
          </div>
          <div className="bg-luxury-surface border border-luxury-border p-6">
            <p className="text-luxury-textMuted text-sm">For Sale</p>
            <p className="text-3xl font-bold text-white">
              {listings.filter(l => l.listingType === 'buy').length}
            </p>
          </div>
          <div className="bg-luxury-surface border border-luxury-border p-6">
            <p className="text-luxury-textMuted text-sm">For Rent</p>
            <p className="text-3xl font-bold text-white">
              {listings.filter(l => l.listingType === 'rent').length}
            </p>
          </div>
        </div>

        {/* Listings */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold text-white">My Listings</h2>
          <Link href="/seller/properties/new" className="btn-secondary flex items-center text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add New Listing
          </Link>
        </div>

        {listings.length === 0 ? (
          <div className="bg-luxury-surface border border-luxury-border p-12 text-center">
            <Building2 className="w-16 h-16 text-luxury-textMuted mx-auto mb-4" />
            <h3 className="font-display text-xl text-white mb-2">No listings yet</h3>
            <p className="text-luxury-textMuted mb-6">
              Start by adding your first property listing
            </p>
            <Link href="/seller/properties/new" className="btn-primary">
              Add Property
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((property) => (
              <div
                key={property.id}
                className="bg-luxury-surface border border-luxury-border p-4 flex flex-col md:flex-row items-start md:items-center gap-4"
              >
                {/* Image */}
                <div className="relative w-full md:w-48 h-32 flex-shrink-0">
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold uppercase ${
                    property.listingType === 'buy'
                      ? 'bg-luxury-gold text-luxury-black'
                      : 'bg-white text-luxury-black'
                  }`}>
                    {property.listingType}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-semibold text-white truncate">
                    {property.title}
                  </h3>
                  <p className="text-luxury-textMuted text-sm">
                    {property.location.subCity}, {property.location.city}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-luxury-textMuted">
                    <span>{property.features.bedrooms} beds</span>
                    <span>{property.features.bathrooms} baths</span>
                    <span>{property.features.size} m²</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-luxury-gold font-bold text-xl">
                    {formatPrice(property.price, property.listingType)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    property.status === 'active'
                      ? 'bg-luxury-success/20 text-luxury-success'
                      : 'bg-luxury-muted text-luxury-textMuted'
                  }`}>
                    {property.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/properties/${property.id}`}
                    className="p-2 text-luxury-textMuted hover:text-white transition-colors"
                    title="View"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="p-2 text-luxury-textMuted hover:text-luxury-error transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}