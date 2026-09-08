'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Filter, Eye, Edit, Trash2, MoreVertical } from 'lucide-react';
import { saasService } from '@/services/saasService';
import { Property } from '@/types/property';

export default function ListingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(saasService.getCurrentUser());
  const [listings, setListings] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    if (!user) { router.push('/saas'); return; }
    setListings(saasService.getListings());
  }, [user, router]);

  const handleDelete = (id: string) => {
    if (confirm('Delete this listing?')) {
      saasService.deleteListing(id);
      setListings(saasService.getListings());
    }
  };

  const filteredListings = listings.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white">Listings</h1><p className="text-luxury-textMuted">Manage your property listings</p></div>
        <Link href="/saas/listings/new" className="btn-primary flex items-center"><Plus className="w-5 h-5 mr-2" />Add Listing</Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-textMuted" /><input type="text" placeholder="Search listings..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input-field pl-10" /></div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field w-auto"><option value="">All Status</option><option value="active">Active</option><option value="pending">Pending</option><option value="sold">Sold</option><option value="draft">Draft</option></select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map(listing => (
          <div key={listing.id} className="bg-luxury-surface border border-luxury-border">
            <div className="relative h-48">
              <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" />
              <span className={`absolute top-2 left-2 px-2 py-1 text-xs ${listing.status === 'active' ? 'bg-luxury-success text-luxury-black' : 'bg-luxury-muted text-white'}`}>{listing.status}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white mb-1 truncate">{listing.title}</h3>
              <p className="text-luxury-textMuted text-sm mb-2">{listing.location.subCity}, {listing.location.city}</p>
              <p className="text-luxury-gold font-bold mb-3">ETB {listing.price.toLocaleString()}</p>
              <div className="flex items-center justify-between text-sm text-luxury-textMuted mb-4">
                <span>{listing.features.bedrooms} bed</span><span>{listing.features.bathrooms} bath</span><span>{listing.features.size} m²</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-luxury-border">
                <div className="flex items-center space-x-2 text-sm text-luxury-textMuted"><Eye className="w-4 h-4" /><span>{listing.views}</span><span className="mx-1">|</span><span>{listing.inquiries} inquiries</span></div>
                <div className="flex items-center space-x-2">
                  <Link href={`/saas/listings/${listing.id}`} className="p-2 text-luxury-textMuted hover:text-luxury-gold"><Eye className="w-4 h-4" /></Link>
                  <button onClick={() => handleDelete(listing.id)} className="p-2 text-luxury-textMuted hover:text-luxury-error"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}