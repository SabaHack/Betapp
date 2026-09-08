'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Plus, 
  MessageSquare, 
  Handshake, 
  FileText, 
  TrendingUp,
  Clock,
  ArrowRight,
  Eye,
  Heart
} from 'lucide-react';
import SaaSLayout from '@/components/saas/SaaSLayout';
import { mockExtendedProperties, mockActivities, currentUserCompany } from '@/data/saasMockData';
import { ListingStatus } from '@/types/saas';

export default function SaaSDashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [properties, setProperties] = useState(mockExtendedProperties);
  const [activities, setActivities] = useState(mockActivities);

  useEffect(() => {
    const userData = localStorage.getItem('betapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Calculate KPIs
  const totalListings = properties.length;
  const activeListings = properties.filter(p => p.status === 'published').length;
  const drafts = properties.filter(p => p.status === 'draft').length;
  const reserved = properties.filter(p => p.status === 'reserved').length;
  const sold = properties.filter(p => p.status === 'sold').length;
  const underConstruction = properties.filter(p => p.status === 'under_construction').length;
  const newInquiries = 3; // Mock value

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString()}`;
  };

  const getStatusColor = (status: ListingStatus) => {
    switch (status) {
      case 'published':
        return 'bg-luxury-success/20 text-luxury-success';
      case 'draft':
        return 'bg-luxury-muted text-luxury-textMuted';
      case 'reserved':
        return 'bg-luxury-gold/20 text-luxury-gold';
      case 'sold':
        return 'bg-blue-500/20 text-blue-400';
      case 'under_construction':
        return 'bg-orange-500/20 text-orange-400';
      default:
        return 'bg-luxury-muted text-luxury-textMuted';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'new_inquiry':
        return <MessageSquare className="w-5 h-5 text-luxury-gold" />;
      case 'buyer_response':
        return <MessageSquare className="w-5 h-5 text-blue-400" />;
      case 'property_published':
        return <Building2 className="w-5 h-5 text-luxury-success" />;
      case 'property_reserved':
        return <Heart className="w-5 h-5 text-luxury-gold" />;
      case 'new_negotiation':
        return <Handshake className="w-5 h-5 text-purple-400" />;
      case 'agreement_update':
        return <FileText className="w-5 h-5 text-green-400" />;
      default:
        return <Clock className="w-5 h-5 text-luxury-textMuted" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-luxury-dark flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-luxury-gold mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold text-white mb-4">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <SaaSLayout 
      userName={user.name}
      companyName={currentUserCompany.name}
      notificationCount={3}
    >
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Dashboard
          </h1>
          <p className="text-luxury-textMuted">
            Welcome back, {user.name}. Here's what's happening with your listings.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
            <p className="text-luxury-textMuted text-sm mb-1">Total Listings</p>
            <p className="text-3xl font-bold text-white">{totalListings}</p>
          </div>
          
          <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
            <p className="text-luxury-textMuted text-sm mb-1">Active</p>
            <p className="text-3xl font-bold text-luxury-success">{activeListings}</p>
          </div>
          
          <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
            <p className="text-luxury-textMuted text-sm mb-1">Drafts</p>
            <p className="text-3xl font-bold text-luxury-textMuted">{drafts}</p>
          </div>
          
          <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
            <p className="text-luxury-textMuted text-sm mb-1">Reserved</p>
            <p className="text-3xl font-bold text-luxury-gold">{reserved}</p>
          </div>
          
          <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
            <p className="text-luxury-textMuted text-sm mb-1">Sold</p>
            <p className="text-3xl font-bold text-blue-400">{sold}</p>
          </div>
          
          <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
            <p className="text-luxury-textMuted text-sm mb-1">Under Construction</p>
            <p className="text-3xl font-bold text-orange-400">{underConstruction}</p>
          </div>
          
          <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
            <p className="text-luxury-textMuted text-sm mb-1">New Inquiries</p>
            <p className="text-3xl font-bold text-purple-400">{newInquiries}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
          <h2 className="font-display text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link
              href="/saas/listings/new"
              className="flex items-center justify-center space-x-2 bg-luxury-gold text-luxury-black font-semibold px-6 py-4 rounded-lg hover:bg-luxury-goldLight transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Property</span>
            </Link>
            
            <Link
              href="/saas/listings"
              className="flex items-center justify-center space-x-2 bg-luxury-muted border border-luxury-border text-white font-semibold px-6 py-4 rounded-lg hover:bg-luxury-border transition-colors"
            >
              <Building2 className="w-5 h-5" />
              <span>Manage Listings</span>
            </Link>
            
            <Link
              href="/saas/inquiries"
              className="flex items-center justify-center space-x-2 bg-luxury-muted border border-luxury-border text-white font-semibold px-6 py-4 rounded-lg hover:bg-luxury-border transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>View Inquiries</span>
            </Link>
            
            <Link
              href="/saas/negotiations"
              className="flex items-center justify-center space-x-2 bg-luxury-muted border border-luxury-border text-white font-semibold px-6 py-4 rounded-lg hover:bg-luxury-border transition-colors"
            >
              <Handshake className="w-5 h-5" />
              <span>View Negotiations</span>
            </Link>
            
            <Link
              href="/saas/documents"
              className="flex items-center justify-center space-x-2 bg-luxury-muted border border-luxury-border text-white font-semibold px-6 py-4 rounded-lg hover:bg-luxury-border transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span>Upload Documents</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold text-white">Recent Activity</h2>
              <Link href="/saas/notifications" className="text-luxury-gold hover:text-luxury-goldLight text-sm flex items-center">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {activities.length === 0 ? (
                <div className="text-center py-8 text-luxury-textMuted">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity</p>
                </div>
              ) : (
                activities.slice(0, 5).map((activity) => (
                  <Link
                    key={activity.id}
                    href={activity.actionUrl || '#'}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-luxury-muted transition-colors"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm">{activity.title}</p>
                      <p className="text-luxury-textMuted text-sm truncate">{activity.description}</p>
                      <p className="text-luxury-textMuted text-xs mt-1">{formatTimeAgo(activity.timestamp)}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Top Performing Properties */}
          <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold text-white">Top Performing Properties</h2>
              <Link href="/saas/analytics" className="text-luxury-gold hover:text-luxury-goldLight text-sm flex items-center">
                View Analytics
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {properties.filter(p => p.status === 'published').length === 0 ? (
                <div className="text-center py-8 text-luxury-textMuted">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No published properties yet</p>
                  <Link
                    href="/saas/listings/new"
                    className="text-luxury-gold text-sm hover:text-luxury-goldLight mt-2 inline-block"
                  >
                    Add your first property
                  </Link>
                </div>
              ) : (
                properties
                  .filter(p => p.status === 'published')
                  .sort((a, b) => b.performance.views - a.performance.views)
                  .slice(0, 4)
                  .map((property) => (
                    <Link
                      key={property.id}
                      href={`/saas/listings/${property.id}`}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-luxury-muted transition-colors"
                    >
                      <div className="w-16 h-16 bg-luxury-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">{property.title}</p>
                        <p className="text-luxury-textMuted text-xs">{property.location.subCity}, {property.location.city}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-luxury-textMuted">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {property.performance.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {property.performance.favorites}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {property.performance.inquiries}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <p className="text-luxury-gold font-bold text-sm">
                          {formatPrice(property.price, property.currency)}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(property.status)}`}>
                          {property.status.replace('_', ' ')}
                        </span>
                      </div>
                    </Link>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </SaaSLayout>
  );
}
