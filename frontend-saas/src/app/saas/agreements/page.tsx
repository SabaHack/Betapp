'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, CheckCircle, Clock, XCircle, PenTool, Download } from 'lucide-react';
import { saasService } from '@/services/saasService';
import { Agreement } from '@/types/property';

export default function AgreementsPage() {
  const router = useRouter();
  const [user, setUser] = useState(saasService.getCurrentUser());
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    if (!user) { router.push('/saas'); return; }
    setAgreements(saasService.getAgreements());
  }, [user, router]);

  const handleStatusChange = (id: string, status: Agreement['status']) => {
    saasService.updateAgreementStatus(id, status);
    setAgreements(saasService.getAgreements());
  };

  const filteredAgreements = agreements.filter(a => !statusFilter || a.status === statusFilter);

  const statusConfig = {
    draft: { icon: FileText, color: 'text-luxury-textMuted', bg: 'bg-luxury-muted' },
    pending: { icon: Clock, color: 'text-luxury-gold', bg: 'bg-luxury-gold/20' },
    signed: { icon: CheckCircle, color: 'text-luxury-success', bg: 'bg-luxury-success/20' },
    completed: { icon: CheckCircle, color: 'text-luxury-success', bg: 'bg-luxury-success/20' },
    cancelled: { icon: XCircle, color: 'text-luxury-error', bg: 'bg-luxury-error/20' },
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white">Agreements</h1><p className="text-luxury-textMuted">{agreements.length} total agreements</p></div>
      </div>

      <div className="flex gap-4 mb-6">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field w-auto">
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="signed">Signed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredAgreements.map(agreement => {
          const config = statusConfig[agreement.status];
          const StatusIcon = config.icon;
          return (
            <div key={agreement.id} className="bg-luxury-surface border border-luxury-border p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 text-xs rounded ${config.bg} ${config.color}`}>{agreement.status.toUpperCase()}</span>
                    <span className="text-luxury-textMuted text-sm">Created: {new Date(agreement.createdAt).toLocaleDateString()}</span>
                    {agreement.signedAt && <span className="text-luxury-textMuted text-sm">Signed: {new Date(agreement.signedAt).toLocaleDateString()}</span>}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{agreement.propertyTitle}</h3>
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div><span className="text-luxury-textMuted">Buyer:</span> <span className="text-white">{agreement.buyerName}</span></div>
                    <div><span className="text-luxury-textMuted">Seller:</span> <span className="text-white">{agreement.sellerName}</span></div>
                    <div><span className="text-luxury-textMuted">Price:</span> <span className="text-luxury-gold font-semibold">ETB {agreement.price.toLocaleString()}</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {agreement.status === 'pending' && (
                    <button onClick={() => handleStatusChange(agreement.id, 'signed')} className="btn-primary flex items-center text-sm">
                      <PenTool className="w-4 h-4 mr-2" />Sign Agreement
                    </button>
                  )}
                  {agreement.status === 'signed' && (
                    <button onClick={() => handleStatusChange(agreement.id, 'completed')} className="btn-secondary text-sm">
                      Mark Completed
                    </button>
                  )}
                  {agreement.status !== 'cancelled' && agreement.status !== 'completed' && (
                    <button onClick={() => handleStatusChange(agreement.id, 'cancelled')} className="text-luxury-textMuted hover:text-luxury-error p-2">
                      <XCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}