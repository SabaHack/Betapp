'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, MessageSquare, Mail, Phone, CheckCircle, Clock, Archive } from 'lucide-react';
import { saasService } from '@/services/saasService';
import { Inquiry } from '@/types/property';

export default function InquiriesPage() {
  const router = useRouter();
  const [user, setUser] = useState(saasService.getCurrentUser());
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    if (!user) { router.push('/saas'); return; }
    setInquiries(saasService.getInquiries());
  }, [user, router]);

  const handleStatusChange = (id: string, status: Inquiry['status']) => {
    saasService.updateInquiryStatus(id, status);
    setInquiries(saasService.getInquiries());
  };

  const filteredInquiries = inquiries.filter(i => !statusFilter || i.status === statusFilter);

  const statusIcons = { new: Clock, contacted: MessageSquare, completed: CheckCircle, archived: Archive };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white">Inquiries</h1><p className="text-luxury-textMuted">{inquiries.length} total inquiries</p></div>
      </div>

      <div className="flex gap-4 mb-6">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field w-auto">
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredInquiries.map(inquiry => {
          const StatusIcon = statusIcons[inquiry.status];
          return (
            <div key={inquiry.id} className="bg-luxury-surface border border-luxury-border p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 text-xs rounded ${inquiry.status === 'new' ? 'bg-luxury-gold text-luxury-black' : 'bg-luxury-muted text-luxury-textMuted'}`}>{inquiry.status}</span>
                    <span className="text-luxury-textMuted text-sm">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-1">{inquiry.propertyTitle}</h3>
                  <p className="text-luxury-textMuted text-sm mb-2">{inquiry.message}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-white"><strong>{inquiry.buyerName}</strong></span>
                    <span className="text-luxury-textMuted flex items-center"><Mail className="w-4 h-4 mr-1" />{inquiry.buyerEmail}</span>
                    <span className="text-luxury-textMuted flex items-center"><Phone className="w-4 h-4 mr-1" />{inquiry.buyerPhone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {inquiry.status === 'new' && <button onClick={() => handleStatusChange(inquiry.id, 'contacted')} className="btn-secondary text-sm">Mark Contacted</button>}
                  {inquiry.status === 'contacted' && <button onClick={() => handleStatusChange(inquiry.id, 'completed')} className="btn-secondary text-sm">Mark Completed</button>}
                  {inquiry.status !== 'archived' && <button onClick={() => handleStatusChange(inquiry.id, 'archived')} className="text-luxury-textMuted hover:text-white p-2"><Archive className="w-5 h-5" /></button>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}