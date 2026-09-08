'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  Copy, 
  CheckCircle, 
  XCircle,
  ArrowUpDown,
  Grid3x3,
  List
} from 'lucide-react';
import SaaSLayout from '@/components/saas/SaaSLayout';
import { mockExtendedProperties, currentUserCompany } from '@/data/saasMockData';
import { ListingStatus, VerificationStatus } from '@/types/saas';

export default function ListingsPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [properties, setProperties] = useState(mockExtendedProperties);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ListingStatus | 'all'>('all');
  const [verificationFilter, setVerificationFilter] = useState<VerificationStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'views' | 'inquiries'>('date');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('betapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString()}`;
  };

  const getStatusColor = (status: ListingStatus) => {
    switch (status) {
      case 'published':
        return 'bg-luxury-success/20 text-luxury-success border-luxury-success/30';
      case 'draft':
        return 'bg-luxury-muted text-luxury-textMuted border-luxury-border';
      case 'reserved':
        return 'bg-luxury-gold/20 text-luxury-gold border-luxury-gold/30';
      case 'sold':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'under_construction':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'pending_review':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'unavailable':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'archived':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-luxury-muted text-luxury-textMuted border-luxury-border';
    }
  };

  const getVerificationColor = (status: VerificationStatus) => {
    switch (status) {
      case 'verified':
        return 'text-luxury-success';
      case 'pending_review':
        return 'text-yellow-400';
      case 'rejected':
        return 'text-luxury-error';
      default:
        return 'text-luxury-textMuted';
    }
  };

  const getVerificationIcon = (status: VerificationStatus) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Filter and sort properties
  const filteredProperties = properties
    .filter(property => {
      const matchesSearch = 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.propertyId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.subCity.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
      const matchesVerification = verificationFilter === 'all' || property.verificationStatus === verificationFilter;
      
      return matchesSearch && matchesStatus && matchesVerification;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'views':
          return b.performance.views - a.performance.views;
        case 'inquiries':
          return b.performance.inquiries - a.performance.inquiries;
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const handlePublish = (propertyId: string) => {
    setProperties(properties.map(p => 
      p.id === propertyId ? { ...p, status: 'published' as ListingStatus } : p
    ));
  };

  const handleUnpublish = (propertyId: string) => {
    setProperties(properties.map(p => 
      p.id === propertyId ? { ...p, status: 'draft' as ListingStatus } : p
    ));
  };

  const handleDelete = (propertyId: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      setProperties(properties.filter(p => p.id !== propertyId));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-luxury-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-white">Loading...</p>
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
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Listings
            </h1>
            <p className="text-luxury-textMuted">
              Manage your property listings ({filteredProperties.length} total)
            </p>
          </div>
          
          <Link
            href="/saas/listings/new"
            className="btn-primary inline-flex items-center justify-center"
          >
            Add Property
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-luxury-surface border border-luxury-border p-4 rounded-lg">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-textMuted" />
                <input
                  type="text"
                  placeholder="Search by name, ID, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-luxury-dark border border-luxury-border rounded-lg pl-10 pr-4 py-2 text-white placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold"
                />
              </div>
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 bg-luxury-dark border border-luxury-border rounded-lg px-4 py-2 text-white hover:border-luxury-gold transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-luxury-dark border border-luxury-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
            >
              <option value="date">Sort by Date</option>
              <option value="price">Sort by Price</option>
              <option value="views">Sort by Views</option>
              <option value="inquiries">Sort by Inquiries</option>
            </select>

            {/* View Toggle */}
            <div className="flex border border-luxury-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 ${viewMode === 'table' ? 'bg-luxury-gold text-luxury-black' : 'bg-luxury-dark text-luxury-textMuted hover:text-white'}`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-luxury-gold text-luxury-black' : 'bg-luxury-dark text-luxury-textMuted hover:text-white'}`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-luxury-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full bg-luxury-dark border border-luxury-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                  <option value="under_construction">Under Construction</option>
                  <option value="pending_review">Pending Review</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Verification</label>
                <select
                  value={verificationFilter}
                  onChange={(e) => setVerificationFilter(e.target.value as any)}
                  className="w-full bg-luxury-dark border border-luxury-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                >
                  <option value="all">All Verification</option>
                  <option value="verified">Verified</option>
                  <option value="pending_review">Pending Review</option>
                  <option value="not_verified">Not Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="bg-luxury-surface border border-luxury-border p-12 text-center rounded-lg">
            <p className="text-luxury-textMuted mb-4">No listings found matching your criteria.</p>
            <Link
              href="/saas/listings/new"
              className="btn-primary inline-flex items-center"
            >
              Add Your First Property
            </Link>
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && filteredProperties.length > 0 && (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-luxury-surface border border-luxury-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-luxury-dark border-b border-luxury-border">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-luxury-textMuted">Property</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-luxury-textMuted">Type</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-luxury-textMuted">Location</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-luxury-textMuted">Price</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-luxury-textMuted">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-luxury-textMuted">Verification</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-luxury-textMuted">Views</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-luxury-textMuted">Inquiries</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-luxury-textMuted">Updated</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-luxury-textMuted">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-luxury-border">
                    {filteredProperties.map((property) => (
                      <tr key={property.id} className="hover:bg-luxury-muted/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-luxury-muted rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={property.images[0]}
                                alt={property.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm truncate max-w-xs">{property.title}</p>
                              {property.propertyId && (
                                <p className="text-luxury-textMuted text-xs">{property.propertyId}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-luxury-textMuted capitalize">
                          {property.propertyType}
                        </td>
                        <td className="px-6 py-4 text-sm text-luxury-textMuted">
                          {property.location.subCity}, {property.location.city}
                        </td>
                        <td className="px-6 py-4 text-sm text-luxury-gold font-semibold">
                          {formatPrice(property.price, property.currency)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
                            {property.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center space-x-1 ${getVerificationColor(property.verificationStatus)}`}>
                            {getVerificationIcon(property.verificationStatus)}
                            <span className="text-sm capitalize">{property.verificationStatus.replace('_', ' ')}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-luxury-textMuted">
                          {property.performance.views}
                        </td>
                        <td className="px-6 py-4 text-sm text-luxury-textMuted">
                          {property.performance.inquiries}
                        </td>
                        <td className="px-6 py-4 text-sm text-luxury-textMuted">
                          {new Date(property.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Link
                              href={`/saas/listings/${property.id}`}
                              className="p-2 text-luxury-textMuted hover:text-white transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/saas/listings/${property.id}/edit`}
                              className="p-2 text-luxury-textMuted hover:text-white transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(property.id)}
                              className="p-2 text-luxury-textMuted hover:text-luxury-error transition-colors"
                              title="Delete"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredProperties.map((property) => (
                <div key={property.id} className="bg-luxury-surface border border-luxury-border rounded-lg p-4">
                  <div className="flex space-x-4 mb-4">
                    <div className="w-20 h-20 bg-luxury-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{property.title}</p>
                      {property.propertyId && (
                        <p className="text-luxury-textMuted text-xs">{property.propertyId}</p>
                      )}
                      <p className="text-luxury-gold font-semibold text-sm mt-1">
                        {formatPrice(property.price, property.currency)}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
                          {property.status.replace('_', ' ')}
                        </span>
                        <div className={`flex items-center space-x-1 text-xs ${getVerificationColor(property.verificationStatus)}`}>
                          {getVerificationIcon(property.verificationStatus)}
                          <span className="capitalize">{property.verificationStatus.replace('_', ' ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center mb-4">
                    <div>
                      <p className="text-luxury-textMuted text-xs">Type</p>
                      <p className="text-white text-sm capitalize">{property.propertyType}</p>
                    </div>
                    <div>
                      <p className="text-luxury-textMuted text-xs">Views</p>
                      <p className="text-white text-sm">{property.performance.views}</p>
                    </div>
                    <div>
                      <p className="text-luxury-textMuted text-xs">Inquiries</p>
                      <p className="text-white text-sm">{property.performance.inquiries}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-luxury-border">
                    <p className="text-luxury-textMuted text-xs">
                      {property.location.subCity}, {property.location.city}
                    </p>
                    <div className="flex items-center space-x-3">
                      <Link
                        href={`/saas/listings/${property.id}`}
                        className="p-2 text-luxury-textMuted hover:text-white transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/saas/listings/${property.id}/edit`}
                        className="p-2 text-luxury-textMuted hover:text-white transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="p-2 text-luxury-textMuted hover:text-luxury-error transition-colors"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && filteredProperties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-luxury-surface border border-luxury-border rounded-lg overflow-hidden hover:border-luxury-gold transition-colors">
                <div className="relative h-48">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(property.status)}`}>
                      {property.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 truncate">{property.title}</h3>
                  <p className="text-luxury-textMuted text-sm mb-3">{property.location.subCity}, {property.location.city}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-luxury-gold font-bold">{formatPrice(property.price, property.currency)}</p>
                    <div className={`flex items-center space-x-1 ${getVerificationColor(property.verificationStatus)}`}>
                      {getVerificationIcon(property.verificationStatus)}
                      <span className="text-xs capitalize">{property.verificationStatus.replace('_', ' ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-luxury-textMuted mb-4">
                    <span>{property.performance.views} views</span>
                    <span>{property.performance.inquiries} inquiries</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/saas/listings/${property.id}`}
                      className="flex-1 btn-secondary text-center text-sm py-2"
                    >
                      View
                    </Link>
                    <Link
                      href={`/saas/listings/${property.id}/edit`}
                      className="flex-1 btn-primary text-center text-sm py-2"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SaaSLayout>
  );
}
