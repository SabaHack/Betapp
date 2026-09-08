'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, TrendingUp, Eye, MessageSquare, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { saasService } from '@/services/saasService';
import { Property } from '@/types/property';

export default function AnalyticsPage() {
  const router = useRouter();
  const [user, setUser] = useState(saasService.getCurrentUser());
  const [listings, setListings] = useState<Property[]>([]);

  useEffect(() => {
    if (!user) { router.push('/saas'); return; }
    setListings(saasService.getListings());
  }, [user, router]);

  const totalViews = listings.reduce((sum, p) => sum + p.views, 0);
  const totalInquiries = listings.reduce((sum, p) => sum + p.inquiries, 0);
  const activeListings = listings.filter(p => p.status === 'active').length;
  const totalValue = listings.filter(p => p.listingType === 'buy').reduce((sum, p) => sum + p.price, 0);

  const stats = [
    { label: 'Total Views', value: totalViews, icon: Eye, change: '+12%', up: true },
    { label: 'Total Inquiries', value: totalInquiries, icon: MessageSquare, change: '+8%', up: true },
    { label: 'Active Listings', value: activeListings, icon: BarChart3, change: '+2', up: true },
    { label: 'Portfolio Value', value: `ETB ${(totalValue / 1000000).toFixed(1)}M`, icon: DollarSign, change: '+5%', up: true },
  ];

  const topProperties = [...listings].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8"><h1 className="font-display text-3xl font-bold text-white">Analytics</h1><p className="text-luxury-textMuted">Track your performance</p></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-luxury-surface border border-luxury-border p-6">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-6 h-6 text-luxury-gold" />
              <span className={`flex items-center text-sm ${stat.up ? 'text-luxury-success' : 'text-luxury-error'}`}>
                {stat.up ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-luxury-textMuted text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-luxury-surface border border-luxury-border">
        <div className="p-6 border-b border-luxury-border"><h2 className="font-display text-xl font-semibold text-white">Top Performing Properties</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-luxury-dark">
              <tr><th className="px-6 py-4 text-left text-sm text-luxury-textMuted">Property</th><th className="px-6 py-4 text-left text-sm text-luxury-textMuted">Views</th><th className="px-6 py-4 text-left text-sm text-luxury-textMuted">Inquiries</th><th className="px-6 py-4 text-left text-sm text-luxury-textMuted">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-luxury-border">
              {topProperties.map(p => (
                <tr key={p.id} className="hover:bg-luxury-dark/50">
                  <td className="px-6 py-4 text-white">{p.title}</td>
                  <td className="px-6 py-4 text-luxury-gold font-semibold">{p.views}</td>
                  <td className="px-6 py-4 text-luxury-textMuted">{p.inquiries}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded ${p.status === 'active' ? 'bg-luxury-success/20 text-luxury-success' : 'bg-luxury-muted text-luxury-textMuted'}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}