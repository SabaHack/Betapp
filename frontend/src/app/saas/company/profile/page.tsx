'use client';

import { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Edit, 
  Eye,
  Users,
  CheckCircle,
  Star,
  Calendar,
  Award
} from 'lucide-react';
import SaaSLayout from '@/components/saas/SaaSLayout';
import { currentUserCompany } from '@/data/saasMockData';

export default function CompanyProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [companyData, setCompanyData] = useState(currentUserCompany);

  useEffect(() => {
    const userData = localStorage.getItem('betapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to the backend
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
      <div className="h-[calc(100vh-140px)] overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Company Profile
            </h1>
            <p className="text-luxury-textMuted">
              Manage your company information and public profile
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                showPreview 
                  ? 'bg-luxury-gold text-luxury-black border-luxury-gold' 
                  : 'bg-luxury-dark text-white border-luxury-border hover:border-luxury-gold'
              }`}
            >
              <Eye className="w-5 h-5" />
              <span>{showPreview ? 'Edit Mode' : 'Preview Mode'}</span>
            </button>
            
            {!showPreview && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-primary flex items-center space-x-2"
              >
                <Edit className="w-5 h-5" />
                <span>{isEditing ? 'Cancel' : 'Edit'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="space-y-6">
          {/* Company Header */}
          <div className="bg-luxury-surface border border-luxury-border rounded-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-luxury-gold to-luxury-muted"></div>
            
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12 mb-4">
                <div className="flex items-end space-x-4">
                  <div className="w-24 h-24 bg-luxury-dark border-4 border-luxury-surface rounded-lg flex items-center justify-center text-luxury-gold text-3xl font-bold">
                    {companyData.name.charAt(0)}
                  </div>
                  <div className="pb-2">
                    <h2 className="text-white text-2xl font-bold">{companyData.name}</h2>
                    <div className="flex items-center space-x-2 text-luxury-textMuted">
                      <MapPin className="w-4 h-4" />
                      <span>{companyData.location.city}, {companyData.location.country}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  {companyData.verified && (
                    <span className="flex items-center space-x-1 bg-luxury-success/20 text-luxury-success px-3 py-1 rounded-full text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified</span>
                    </span>
                  )}
                  <span className="flex items-center space-x-1 bg-luxury-gold/20 text-luxury-gold px-3 py-1 rounded-full text-sm">
                    <Star className="w-4 h-4" />
                    <span>{companyData.rating.toFixed(1)}</span>
                  </span>
                </div>
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-luxury-textMuted mb-2">Company Name</label>
                    <input
                      type="text"
                      value={companyData.name}
                      onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-luxury-textMuted mb-2">Tagline</label>
                    <input
                      type="text"
                      value={companyData.tagline}
                      onChange={(e) => setCompanyData({ ...companyData, tagline: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button onClick={handleSave} className="btn-primary flex-1">
                      Save Changes
                    </button>
                    <button onClick={() => setIsEditing(false)} className="btn-secondary flex-1">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-luxury-textMuted">{companyData.tagline}</p>
              )}
            </div>
          </div>

          {/* Company Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-luxury-muted rounded-lg flex items-center justify-center text-luxury-gold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-luxury-textMuted text-sm">Phone</p>
                    <p className="text-white">{companyData.contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-luxury-muted rounded-lg flex items-center justify-center text-luxury-gold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-luxury-textMuted text-sm">Email</p>
                    <p className="text-white">{companyData.contact.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-luxury-muted rounded-lg flex items-center justify-center text-luxury-gold">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-luxury-textMuted text-sm">Website</p>
                    <a href={companyData.contact.website} target="_blank" rel="noopener noreferrer" className="text-luxury-gold hover:underline">
                      {companyData.contact.website}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-luxury-muted rounded-lg flex items-center justify-center text-luxury-gold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-luxury-textMuted text-sm">Address</p>
                    <p className="text-white">{companyData.location.address}</p>
                    <p className="text-white">{companyData.location.city}, {companyData.location.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Stats */}
            <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Company Stats
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-luxury-dark border border-luxury-border rounded-lg p-4">
                  <p className="text-luxury-textMuted text-sm mb-1">Total Listings</p>
                  <p className="text-white text-2xl font-bold">{companyData.stats.totalListings}</p>
                </div>
                
                <div className="bg-luxury-dark border border-luxury-border rounded-lg p-4">
                  <p className="text-luxury-textMuted text-sm mb-1">Active Listings</p>
                  <p className="text-white text-2xl font-bold">{companyData.stats.activeListings}</p>
                </div>
                
                <div className="bg-luxury-dark border border-luxury-border rounded-lg p-4">
                  <p className="text-luxury-textMuted text-sm mb-1">Total Sales</p>
                  <p className="text-white text-2xl font-bold">{companyData.stats.totalSales}</p>
                </div>
                
                <div className="bg-luxury-dark border border-luxury-border rounded-lg p-4">
                  <p className="text-luxury-textMuted text-sm mb-1">Years Active</p>
                  <p className="text-white text-2xl font-bold">{companyData.stats.yearsActive}</p>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              About Company
            </h3>
            
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={companyData.description}
                  onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                  rows={6}
                  className="input-field resize-none"
                />
                <div className="flex space-x-3">
                  <button onClick={handleSave} className="btn-primary">
                    Save Changes
                  </button>
                  <button onClick={() => setIsEditing(false)} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-luxury-textMuted whitespace-pre-line">{companyData.description}</p>
            )}
          </div>

          {/* Specializations */}
          <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Specializations
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {companyData.specializations.map((spec, index) => (
                <span key={index} className="bg-luxury-muted text-white px-3 py-1 rounded-full text-sm">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Verification Status
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  companyData.verified 
                    ? 'bg-luxury-success/20 text-luxury-success' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    {companyData.verified ? 'Verified Company' : 'Pending Verification'}
                  </p>
                  <p className="text-luxury-textMuted text-sm">
                    {companyData.verified 
                      ? `Verified on ${new Date(companyData.verifiedAt || '').toLocaleDateString()}` 
                      : 'Your verification request is being processed'}
                  </p>
                </div>
              </div>
              
              {!companyData.verified && (
                <button className="btn-secondary">
                  Request Verification
                </button>
              )}
            </div>
          </div>

          {/* Member Since */}
          <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-luxury-muted rounded-lg flex items-center justify-center text-luxury-gold">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-luxury-textMuted text-sm">Member Since</p>
                <p className="text-white font-medium">{new Date(companyData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SaaSLayout>
  );
}
