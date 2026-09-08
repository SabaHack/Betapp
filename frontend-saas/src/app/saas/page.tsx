'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Building2, MessageSquare, FileText, TrendingUp, DollarSign, Eye, Users, Plus, ArrowUpRight, Calendar, CheckCircle, Clock } from 'lucide-react';
import { saasService } from '@/services/saasService';
import { Property, Inquiry, Agreement } from '@/types/property';

export default function SaaSDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(saasService.getCurrentUser());
  const [listings, setListings] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [agreements, setAgreements] = useState<Agreement[]>([]);

  useEffect(() => {
    if (!user) { router.push('/saas'); return; }
    setListings(saasService.getListings());
    setInquiries(saasService.getInquiries());
    setAgreements(saasService.getAgreements());
  }, [user, router]);

  const stats = [
    { label: 'Total Listings', value: listings.length, icon: Building2, color: 'text-luxury-gold' },
    { label: 'Total Inquiries', value: inquiries.length, icon: MessageSquare, color: 'text-blue-400' },
    { label: 'Active Agreements', value: agreements.filter(a => a.status === 'signed').length, icon: FileText, color: 'text-green-400' },
    { label: 'Total Views', value: listings.reduce((sum, p) => sum + p.views, 0), icon: Eye, color: 'text-purple-400' },
  ];

  const recentInquiries = inquiries.slice(0, 5);
  const recentAgreements = agreements.filter(a => a.status === 'pending' || a.status === 'signed').slice(0, 3);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white">Dashboard</h1><p className="text-luxury-textMuted">Welcome back, {user?.name}</p></div>
        <Link href="/saas/listings/new" className="btn-primary flex items-center"><Plus className="w-5 h-5 mr-2" />Add Listing</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-luxury-surface border border-luxury-border p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-luxury-textMuted text-sm">{stat.label}</p><p className="text-3xl font-bold text-white mt-1">{stat.value}</p></div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color} bg-luxury-gold/10`}><stat.icon className="w-6 h-6" /></div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-luxury-surface border border-luxury-border">
          <div className="p-6 border-b border-luxury-border flex justify-between items-center">
            <h2 className="font-display text-xl font-semibold text-white">Recent Inquiries</h2>
            <Link href="/saas/inquiries" className="text-luxury-gold text-sm hover:underline">View All</Link>
          </div>
          <div className="p-6 space-y-4">
            {recentInquiries.length === 0 ? (
              <p className="text-luxury-textMuted">No inquiries yet</p>
            ) : (
              recentInquiries.map(inquiry => (
                <div key={inquiry.id} className="flex items-start space-x-4 p-4 bg-luxury-dark rounded">
                  <div className="w-10 h-10 bg-luxury-gold/10 rounded-full flex items-center justify-center flex-shrink-0"><Users className="w-5 h-5 text-luxury-gold" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between"><p className="text-white font-medium truncate">{inquiry.buyerName}</p><span className={`text-xs px-2 py-1 rounded ${inquiry.status === 'new' ? 'bg-luxury-gold text-luxury-black' : 'bg-luxury-muted text-luxury-textMuted'}`}>{inquiry.status}</span></div>
                    <p className="text-luxury-textMuted text-sm truncate">{inquiry.propertyTitle}</p>
                    <p className="text-luxury-textMuted text-xs mt-1">{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Active Agreements */}
        <div className="bg-luxury-surface border border-luxury-border">
          <div className="p-6 border-b border-luxury-border flex justify-between items-center">
            <h2 className="font-display text-xl font-semibold text-white">Active Agreements</h2>
            <Link href="/saas/agreements" className="text-luxury-gold text-sm hover:underline">View All</Link>
          </div>
          <div className="p-6 space-y-4">
            {recentAgreements.length === 0 ? (
              <p className="text-luxury-textMuted">No active agreements</p>
            ) : (
              recentAgreements.map(agreement => (
                <div key={agreement.id} className="p-4 bg-luxury-dark rounded">
                  <div className="flex items-center justify-between mb-2"><p className="text-white font-medium truncate">{agreement.propertyTitle}</p><span className={`text-xs px-2 py-1 rounded ${agreement.status === 'signed' ? 'bg-luxury-success/20 text-luxury-success' : 'bg-luxury-gold/20 text-luxury-gold'}`}>{agreement.status}</span></div>
                  <p className="text-luxury-textMuted text-sm">Buyer: {agreement.buyerName}</p>
                  <p className="text-luxury-gold font-semibold mt-2">ETB {agreement.price.toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Listings Overview */}
      <div className="mt-8 bg-luxury-surface border border-luxury-border">
        <div className="p-6 border-b border-luxury-border flex justify-between items-center">
          <h2 className="font-display text-xl font-semibold text-white">Listings Overview</h2>
          <Link href="/saas/listings" className="text-luxury-gold text-sm hover:underline">Manage Listings</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-luxury-dark">
              <tr><th className="px-6 py-4 text-left text-sm text-luxury-textMuted font-medium">Property</th><th className="px-6 py-4 text-left text-sm text-luxury-textMuted font-medium">Price</th><th className="px-6 py-4 text-left text-sm text-luxury-textMuted font-medium">Status</th><th className="px-6 py-4 text-left text-sm text-luxury-textMuted font-medium">Views</th><th className="px-6 py-4 text-left text-sm text-luxury-textMuted font-medium">Inquiries</th></tr>
            </thead>
            <tbody className="divide-y divide-luxury-border">
              {listings.slice(0, 5).map(listing => (
                <tr key={listing.id} className="hover:bg-luxury-dark/50">
                  <td className="px-6 py-4"><p className="text-white font-medium">{listing.title}</p><p className="text-luxury-textMuted text-sm">{listing.location.subCity}</p></td>
                  <td className="px-6 py-4 text-luxury-gold font-semibold">ETB {listing.price.toLocaleString()}</td>
                  <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded ${listing.status === 'active' ? 'bg-luxury-success/20 text-luxury-success' : 'bg-luxury-muted text-luxury-textMuted'}`}>{listing.status}</span></td>
                  <td className="px-6 py-4 text-luxury-textMuted">{listing.views}</td>
                  <td className="px-6 py-4 text-luxury-textMuted">{listing.inquiries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}