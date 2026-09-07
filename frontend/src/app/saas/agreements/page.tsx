'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download,
  Eye,
  PenTool,
  CheckCircle,
  Clock,
  Calendar,
  User,
  DollarSign
} from 'lucide-react';
import SaaSLayout from '@/components/saas/SaaSLayout';
import { mockAgreements, currentUserCompany } from '@/data/saasMockData';
import { AgreementStatus } from '@/types/saas';

export default function AgreementsPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [agreements, setAgreements] = useState(mockAgreements);
  const [selectedAgreement, setSelectedAgreement] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AgreementStatus | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureData, setSignatureData] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('betapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getStatusColor = (status: AgreementStatus) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'pending_buyer':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'pending_seller':
        return 'bg-luxury-gold/20 text-luxury-gold border-luxury-gold/30';
      case 'signed':
        return 'bg-luxury-success/20 text-luxury-success border-luxury-success/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-luxury-muted text-luxury-textMuted border-luxury-border';
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString()}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredAgreements = agreements.filter(agreement => {
    const matchesSearch = 
      agreement.buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agreement.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || agreement.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSignAgreement = (agreementId: string) => {
    setAgreements(agreements.map(agreement => {
      if (agreement.id === agreementId) {
        return {
          ...agreement,
          status: 'signed' as AgreementStatus,
          importantDates: {
            ...agreement.importantDates,
            sellerSigned: new Date().toISOString()
          }
        };
      }
      return agreement;
    }));
    setShowSignatureModal(false);
    setSignatureData('');
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

  const selectedAgreementData = selectedAgreement 
    ? agreements.find(a => a.id === selectedAgreement)
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
              Agreements
            </h1>
            <p className="text-luxury-textMuted">
              Manage property agreements ({filteredAgreements.length} total)
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
                <option value="draft">Draft</option>
                <option value="pending_buyer">Pending Buyer</option>
                <option value="pending_seller">Pending Seller</option>
                <option value="signed">Signed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Agreements List */}
          <div className="w-full lg:w-1/3 bg-luxury-surface border border-luxury-border rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b border-luxury-border">
              <h2 className="font-semibold text-white">All Agreements</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredAgreements.length === 0 ? (
                <div className="p-8 text-center text-luxury-textMuted">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No agreements found</p>
                </div>
              ) : (
                filteredAgreements.map((agreement) => (
                  <button
                    key={agreement.id}
                    onClick={() => setSelectedAgreement(agreement.id)}
                    className={`w-full p-4 border-b border-luxury-border hover:bg-luxury-muted transition-colors text-left ${
                      selectedAgreement === agreement.id ? 'bg-luxury-muted' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center text-luxury-black font-semibold">
                          {agreement.buyer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{agreement.buyer.name}</p>
                          <p className="text-luxury-textMuted text-xs">{agreement.propertyTitle}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(agreement.status)}`}>
                        {agreement.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-luxury-gold font-semibold">
                        {formatPrice(agreement.agreedPrice, 'ETB')}
                      </p>
                    </div>
                    
                    <p className="text-luxury-textMuted text-xs">
                      Created {formatDate(agreement.importantDates.agreementCreated)}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Agreement Details */}
          <div className="hidden lg:flex flex-1 bg-luxury-surface border border-luxury-border rounded-lg overflow-hidden">
            {!selectedAgreementData ? (
              <div className="flex-1 flex items-center justify-center text-luxury-textMuted">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select an agreement to view details</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-luxury-border flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center text-luxury-black font-semibold text-lg">
                      {selectedAgreementData.buyer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{selectedAgreementData.buyer.name}</h3>
                      <p className="text-luxury-textMuted text-sm">{selectedAgreementData.propertyTitle}</p>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedAgreementData.status)}`}>
                    {selectedAgreementData.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Agreement Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="bg-luxury-dark border border-luxury-border rounded-lg p-6 mb-6">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Agreement Details
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-luxury-textMuted text-sm">Agreed Price</p>
                        <p className="text-white font-semibold text-lg">{formatPrice(selectedAgreementData.agreedPrice, 'ETB')}</p>
                      </div>
                      <div>
                        <p className="text-luxury-textMuted text-sm">Agreement ID</p>
                        <p className="text-white font-semibold">{selectedAgreementData.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-luxury-dark border border-luxury-border rounded-lg p-6 mb-6">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Important Dates
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-luxury-textMuted">Agreement Created</span>
                        <span className="text-white">{formatDate(selectedAgreementData.importantDates.agreementCreated)}</span>
                      </div>
                      {selectedAgreementData.importantDates.sentToBuyer && (
                        <div className="flex items-center justify-between">
                          <span className="text-luxury-textMuted">Sent to Buyer</span>
                          <span className="text-white">{formatDate(selectedAgreementData.importantDates.sentToBuyer)}</span>
                        </div>
                      )}
                      {selectedAgreementData.importantDates.buyerReview && (
                        <div className="flex items-center justify-between">
                          <span className="text-luxury-textMuted">Buyer Reviewed</span>
                          <span className="text-white">{formatDate(selectedAgreementData.importantDates.buyerReview)}</span>
                        </div>
                      )}
                      {selectedAgreementData.importantDates.sellerSigned && (
                        <div className="flex items-center justify-between">
                          <span className="text-luxury-textMuted">Seller Signed</span>
                          <span className="text-luxury-success flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {formatDate(selectedAgreementData.importantDates.sellerSigned)}
                          </span>
                        </div>
                      )}
                      {selectedAgreementData.importantDates.buyerSigned && (
                        <div className="flex items-center justify-between">
                          <span className="text-luxury-textMuted">Buyer Signed</span>
                          <span className="text-luxury-success flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {formatDate(selectedAgreementData.importantDates.buyerSigned)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-luxury-dark border border-luxury-border rounded-lg p-6 mb-6">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Terms & Conditions
                    </h4>
                    
                    <p className="text-luxury-textMuted whitespace-pre-line">
                      {selectedAgreementData.terms}
                    </p>
                  </div>

                  {/* Signature Section */}
                  <div className="bg-luxury-dark border border-luxury-border rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <PenTool className="w-5 h-5 mr-2" />
                      Signatures
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className={`p-4 rounded-lg border ${
                        selectedAgreementData.importantDates.sellerSigned 
                          ? 'bg-luxury-success/10 border-luxury-success' 
                          : 'bg-luxury-muted border-luxury-border'
                      }`}>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center text-luxury-black font-semibold">
                            {currentUserCompany.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium">{currentUserCompany.name}</p>
                            <p className="text-luxury-textMuted text-xs">Seller</p>
                          </div>
                        </div>
                        
                        {selectedAgreementData.importantDates.sellerSigned ? (
                          <div className="text-luxury-success flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span className="text-sm">Signed on {formatDate(selectedAgreementData.importantDates.sellerSigned)}</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowSignatureModal(true)}
                            disabled={selectedAgreementData.status !== 'pending_seller'}
                            className="btn-primary w-full text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Sign Agreement
                          </button>
                        )}
                      </div>
                      
                      <div className={`p-4 rounded-lg border ${
                        selectedAgreementData.importantDates.buyerSigned 
                          ? 'bg-luxury-success/10 border-luxury-success' 
                          : 'bg-luxury-muted border-luxury-border'
                      }`}>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {selectedAgreementData.buyer.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium">{selectedAgreementData.buyer.name}</p>
                            <p className="text-luxury-textMuted text-xs">Buyer</p>
                          </div>
                        </div>
                        
                        {selectedAgreementData.importantDates.buyerSigned ? (
                          <div className="text-luxury-success flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span className="text-sm">Signed on {formatDate(selectedAgreementData.importantDates.buyerSigned)}</span>
                          </div>
                        ) : (
                          <div className="text-luxury-textMuted text-sm flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>Pending signature</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-luxury-border flex items-center space-x-3">
                  <button className="btn-secondary flex-1 flex items-center justify-center">
                    <Download className="w-5 h-5 mr-2" />
                    Download PDF
                  </button>
                  <button className="btn-secondary flex-1 flex items-center justify-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Preview
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Signature Modal */}
        {showSignatureModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6 max-w-lg w-full mx-4">
              <h3 className="text-white font-semibold mb-4">Sign Agreement</h3>
              
              <div className="bg-luxury-dark border border-luxury-border rounded-lg p-4 mb-4">
                <p className="text-luxury-textMuted text-sm mb-2">
                  By signing, you agree to the terms and conditions of this agreement.
                </p>
                <div className="bg-white rounded-lg h-32 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Signature pad (simulated)</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowSignatureModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSignAgreement(selectedAgreement!)}
                  className="btn-primary flex-1"
                >
                  Confirm Signature
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SaaSLayout>
  );
}
