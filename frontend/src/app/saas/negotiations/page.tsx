'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Handshake, 
  Search, 
  Filter, 
  MoreVertical, 
  Send, 
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  FileText
} from 'lucide-react';
import SaaSLayout from '@/components/saas/SaaSLayout';
import { mockNegotiations, currentUserCompany } from '@/data/saasMockData';
import { NegotiationStatus } from '@/types/saas';

export default function NegotiationsPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [negotiations, setNegotiations] = useState(mockNegotiations);
  const [selectedNegotiation, setSelectedNegotiation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<NegotiationStatus | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [newOfferAmount, setNewOfferAmount] = useState('');
  const [newOfferMessage, setNewOfferMessage] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('betapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getStatusColor = (status: NegotiationStatus) => {
    switch (status) {
      case 'active':
        return 'bg-luxury-gold/20 text-luxury-gold border-luxury-gold/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'accepted':
        return 'bg-luxury-success/20 text-luxury-success border-luxury-success/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'withdrawn':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-luxury-muted text-luxury-textMuted border-luxury-border';
    }
  };

  const getHistoryTypeColor = (type: string) => {
    switch (type) {
      case 'offer':
        return 'bg-luxury-gold/20 text-luxury-gold border-luxury-gold/30';
      case 'counteroffer':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'accept':
        return 'bg-luxury-success/20 text-luxury-success border-luxury-success/30';
      case 'reject':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-luxury-muted text-luxury-textMuted border-luxury-border';
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString()}`;
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

  const filteredNegotiations = negotiations.filter(negotiation => {
    const matchesSearch = 
      negotiation.buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      negotiation.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || negotiation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSendCounterOffer = (negotiationId: string) => {
    if (!newOfferAmount || !newOfferMessage.trim()) return;
    
    setNegotiations(negotiations.map(negotiation => {
      if (negotiation.id === negotiationId) {
        return {
          ...negotiation,
          status: 'active' as NegotiationStatus,
          sellerCounteroffer: parseFloat(newOfferAmount),
          updatedAt: new Date().toISOString(),
          lastActivity: new Date().toISOString(),
          history: [
            ...negotiation.history,
            {
              id: `history-${Date.now()}`,
              type: 'counteroffer' as const,
              amount: parseFloat(newOfferAmount),
              party: 'seller' as const,
              timestamp: new Date().toISOString(),
              message: newOfferMessage
            }
          ]
        };
      }
      return negotiation;
    }));
    
    setNewOfferAmount('');
    setNewOfferMessage('');
  };

  const handleAcceptOffer = (negotiationId: string) => {
    setNegotiations(negotiations.map(negotiation => {
      if (negotiation.id === negotiationId) {
        return {
          ...negotiation,
          status: 'accepted' as NegotiationStatus,
          updatedAt: new Date().toISOString(),
          lastActivity: new Date().toISOString(),
          history: [
            ...negotiation.history,
            {
              id: `history-${Date.now()}`,
              type: 'accept' as const,
              amount: negotiation.buyerOffer,
              party: 'seller' as const,
              timestamp: new Date().toISOString(),
              message: 'Offer accepted'
            }
          ]
        };
      }
      return negotiation;
    }));
  };

  const handleRejectOffer = (negotiationId: string) => {
    setNegotiations(negotiations.map(negotiation => {
      if (negotiation.id === negotiationId) {
        return {
          ...negotiation,
          status: 'rejected' as NegotiationStatus,
          updatedAt: new Date().toISOString(),
          lastActivity: new Date().toISOString(),
          history: [
            ...negotiation.history,
            {
              id: `history-${Date.now()}`,
              type: 'reject' as const,
              amount: negotiation.buyerOffer,
              party: 'seller' as const,
              timestamp: new Date().toISOString(),
              message: 'Offer rejected'
            }
          ]
        };
      }
      return negotiation;
    }));
  };

  const handleWithdrawNegotiation = (negotiationId: string) => {
    if (confirm('Are you sure you want to withdraw this negotiation?')) {
      setNegotiations(negotiations.map(negotiation => 
        negotiation.id === negotiationId ? { ...negotiation, status: 'withdrawn' as NegotiationStatus } : negotiation
      ));
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

  const selectedNegotiationData = selectedNegotiation 
    ? negotiations.find(n => n.id === selectedNegotiation)
    : null;

  return (
    <SaaSLayout 
      userName={user.name}
      companyName={currentUserCompany.name}
      notificationCount={3}
    >
      <div className="h-[calc(100vh-140px)] flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Negotiations
            </h1>
            <p className="text-luxury-textMuted">
              Manage price negotiations ({filteredNegotiations.length} total)
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-luxury-surface border border-luxury-border p-4 rounded-lg mb-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-textMuted" />
                <input
                  type="text"
                  placeholder="Search by buyer name or property..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-luxury-dark border border-luxury-border rounded-lg pl-10 pr-4 py-2 text-white placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 bg-luxury-dark border border-luxury-border rounded-lg px-4 py-2 text-white hover:border-luxury-gold transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>

            {showFilters && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-luxury-dark border border-luxury-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Negotiations List */}
          <div className="w-full lg:w-1/3 bg-luxury-surface border border-luxury-border rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b border-luxury-border">
              <h2 className="font-semibold text-white">All Negotiations</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredNegotiations.length === 0 ? (
                <div className="p-8 text-center text-luxury-textMuted">
                  <Handshake className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No negotiations found</p>
                </div>
              ) : (
                filteredNegotiations.map((negotiation) => (
                  <button
                    key={negotiation.id}
                    onClick={() => setSelectedNegotiation(negotiation.id)}
                    className={`w-full p-4 border-b border-luxury-border hover:bg-luxury-muted transition-colors text-left ${
                      selectedNegotiation === negotiation.id ? 'bg-luxury-muted' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center text-luxury-black font-semibold">
                          {negotiation.buyer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{negotiation.buyer.name}</p>
                          <p className="text-luxury-textMuted text-xs">{negotiation.propertyTitle}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(negotiation.status)}`}>
                        {negotiation.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-luxury-gold font-semibold">
                        {formatPrice(negotiation.buyerOffer, 'ETB')}
                      </p>
                      <span className="text-luxury-textMuted text-xs flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTimeAgo(negotiation.updatedAt)}
                      </span>
                    </div>
                    
                    <p className="text-luxury-textMuted text-sm">
                      {negotiation.history.length} history item{parseInt(negotiation.history.length) > 1 ? 's' : ''}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Negotiation Details */}
          <div className="hidden lg:flex flex-1 bg-luxury-surface border border-luxury-border rounded-lg overflow-hidden">
            {!selectedNegotiationData ? (
              <div className="flex-1 flex items-center justify-center text-luxury-textMuted">
                <div className="text-center">
                  <Handshake className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select a negotiation to view details</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-luxury-border flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center text-luxury-black font-semibold text-lg">
                      {selectedNegotiationData.buyer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{selectedNegotiationData.buyer.name}</h3>
                      <p className="text-luxury-textMuted text-sm">{selectedNegotiationData.propertyTitle}</p>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedNegotiationData.status)}`}>
                    {selectedNegotiationData.status}
                  </span>
                </div>

                {/* Offers Timeline */}
                <div className="flex-1 overflow-y-auto p-4">
                  <h4 className="text-white font-semibold mb-4">Offer History</h4>
                  
                  <div className="space-y-4">
                    {selectedNegotiationData.history.map((historyItem, index) => (
                      <div key={historyItem.id} className="relative">
                        {index < selectedNegotiationData.history.length - 1 && (
                          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-luxury-border"></div>
                        )}
                        
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            historyItem.type === 'offer' ? 'bg-luxury-gold text-luxury-black' :
                            historyItem.type === 'counteroffer' ? 'bg-purple-500 text-white' :
                            historyItem.type === 'accept' ? 'bg-luxury-success text-white' :
                            historyItem.type === 'reject' ? 'bg-red-500 text-white' :
                            'bg-luxury-muted text-luxury-textMuted'
                          }`}>
                            <DollarSign className="w-6 h-6" />
                          </div>
                          
                          <div className="flex-1 bg-luxury-dark border border-luxury-border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                {historyItem.amount && (
                                  <p className="text-white font-semibold">
                                    {formatPrice(historyItem.amount, 'ETB')}
                                  </p>
                                )}
                                <p className="text-luxury-textMuted text-xs capitalize">
                                  {historyItem.type} by {historyItem.party}
                                </p>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs border ${getHistoryTypeColor(historyItem.type)}`}>
                                {historyItem.type}
                              </span>
                            </div>
                            
                            {historyItem.message && (
                              <p className="text-luxury-textMuted text-sm mb-2">{historyItem.message}</p>
                            )}
                            
                            <p className="text-luxury-textMuted text-xs">
                              {new Date(historyItem.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Counter Offer Form */}
                {selectedNegotiationData.status === 'active' && (
                  <div className="p-4 border-t border-luxury-border">
                    <h4 className="text-white font-semibold mb-4">Send Counter Offer</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-luxury-textMuted mb-2">Offer Amount</label>
                        <input
                          type="number"
                          value={newOfferAmount}
                          onChange={(e) => setNewOfferAmount(e.target.value)}
                          placeholder="Enter your counter offer amount"
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-luxury-textMuted mb-2">Message (Optional)</label>
                        <textarea
                          value={newOfferMessage}
                          onChange={(e) => setNewOfferMessage(e.target.value)}
                          placeholder="Add a message with your counter offer..."
                          rows={2}
                          className="input-field resize-none"
                        />
                      </div>
                      
                      <button
                        onClick={() => handleSendCounterOffer(selectedNegotiationData.id)}
                        disabled={!newOfferAmount}
                        className="btn-primary w-full flex items-center justify-center"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Counter Offer
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                {selectedNegotiationData.status === 'active' && (
                  <div className="p-4 border-t border-luxury-border">
                    <button
                      onClick={() => handleWithdrawNegotiation(selectedNegotiationData.id)}
                      className="w-full btn-secondary text-luxury-error border-luxury-error hover:bg-luxury-error/10"
                    >
                      Withdraw Negotiation
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </SaaSLayout>
  );
}
