'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Mail, Phone, MapPin, Globe, CheckCircle, Clock } from 'lucide-react';
import { saasService } from '@/services/saasService';
import { Company } from '@/types/property';

export default function CompanyPage() {
  const router = useRouter();
  const [user, setUser] = useState(saasService.getCurrentUser());
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    if (!user) { router.push('/saas'); return; }
    setCompany(saasService.getCompany());
  }, [user, router]);

  if (!company) return null;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8"><h1 className="font-display text-3xl font-bold text-white">Company Profile</h1><p className="text-luxury-textMuted">Manage your company information</p></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-luxury-surface border border-luxury-border p-6">
            <h2 className="font-display text-xl font-semibold text-white mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm text-luxury-textMuted mb-1">Company Name</label><p className="text-white">{company.name}</p></div>
              <div><label className="block text-sm text-luxury-textMuted mb-1">Email</label><p className="text-white flex items-center"><Mail className="w-4 h-4 mr-2 text-luxury-gold" />{company.email}</p></div>
              <div><label className="block text-sm text-luxury-textMuted mb-1">Phone</label><p className="text-white flex items-center"><Phone className="w-4 h-4 mr-2 text-luxury-gold" />{company.phone}</p></div>
              <div><label className="block text-sm text-luxury-textMuted mb-1">Website</label><p className="text-white flex items-center"><Globe className="w-4 h-4 mr-2 text-luxury-gold" />{company.website || 'Not set'}</p></div>
              <div className="md:col-span-2"><label className="block text-sm text-luxury-textMuted mb-1">Address</label><p className="text-white flex items-center"><MapPin className="w-4 h-4 mr-2 text-luxury-gold" />{company.address}</p></div>
              <div className="md:col-span-2"><label className="block text-sm text-luxury-textMuted mb-1">Description</label><p className="text-white">{company.description}</p></div>
            </div>
          </div>

          <div className="bg-luxury-surface border border-luxury-border p-6">
            <h2 className="font-display text-xl font-semibold text-white mb-4">Verification Status</h2>
            <div className="flex items-center justify-between p-4 bg-luxury-dark rounded">
              <div className="flex items-center">
                {company.verified ? <CheckCircle className="w-6 h-6 text-luxury-success mr-3" /> : <Clock className="w-6 h-6 text-luxury-gold mr-3" />}
                <div><p className="text-white font-medium">{company.verified ? 'Verified Company' : 'Verification Pending'}</p><p className="text-luxury-textMuted text-sm">{company.verified ? 'Your company has been verified by BETAPP' : 'Submit documents for verification'}</p></div>
              </div>
              <button className="btn-secondary text-sm">{company.verified ? 'View Badge' : 'Get Verified'}</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-luxury-surface border border-luxury-border p-6">
            <h2 className="font-display text-xl font-semibold text-white mb-4">Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between"><span className="text-luxury-textMuted">Total Listings</span><span className="text-white font-semibold">{company.totalListings}</span></div>
              <div className="flex justify-between"><span className="text-luxury-textMuted">Rating</span><span className="text-luxury-gold font-semibold">{company.rating} / 5.0</span></div>
              <div className="flex justify-between"><span className="text-luxury-textMuted">Member Since</span><span className="text-white">{new Date(company.joinedAt).toLocaleDateString()}</span></div>
            </div>
          </div>

          <div className="bg-luxury-surface border border-luxury-border p-6">
            <h2 className="font-display text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 text-luxury-textMuted hover:bg-luxury-dark hover:text-white transition-colors">Edit Profile</button>
              <button className="w-full text-left px-4 py-3 text-luxury-textMuted hover:bg-luxury-dark hover:text-white transition-colors">Upload Documents</button>
              <button className="w-full text-left px-4 py-3 text-luxury-textMuted hover:bg-luxury-dark hover:text-white transition-colors">Team Members</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}