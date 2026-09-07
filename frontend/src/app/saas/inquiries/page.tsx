'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  MoreVertical, 
  Send, 
  Phone, 
  Mail,
  Clock,
  CheckCircle,
  Archive,
  Star
} from 'lucide-react';
import SaaSLayout from '@/components/saas/SaaSLayout';
import { mockInquiries, currentUserCompany } from '@/data/saasMockData';
import { InquiryStatus } from '@/types/saas';

export default function InquiriesPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('betapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getStatusColor = (status: InquiryStatus) => {
    switch (status) {
      case 'new':
        return 'bg-luxury-gold/20 text-luxury-gold border-luxury-gold/30';
      case 'responded':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in_discussion':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'closed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-luxury-muted text-luxury-textMuted border-luxury-border';
    }
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

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSendMessage = (inquiryId: string) => {
    if (!newMessage.trim()) return;
    
    setInquiries(inquiries.map(inquiry => {
      if (inquiry.id === inquiryId) {
        return {
          ...inquiry,
          status: 'in_discussion' as InquiryStatus,
          updatedAt: new Date().toISOString(),
          lastActivity: new Date().toISOString(),
          messages: [
            ...inquiry.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'seller',
              message: newMessage,
              timestamp: new Date().toISOString(),
              read: false
            }
          ]
        };
      }
      return inquiry;
    }));
    
    setNewMessage('');
  };

  const handleMarkAsRead = (inquiryId: string) => {
    setInquiries(inquiries.map(inquiry => {
      if (inquiry.id === inquiryId) {
        return {
          ...inquiry,
          messages: inquiry.messages.map(msg => ({ ...msg, read: true }))
        };
      }
      return inquiry;
    }));
  };

  const handleCloseInquiry = (inquiryId: string) => {
    if (confirm('Are you sure you want to close this inquiry?')) {
      setInquiries(inquiries.map(inquiry => 
        inquiry.id === inquiryId ? { ...inquiry, status: 'closed' as InquiryStatus } : inquiry
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

  const selectedInquiryData = selectedInquiry 
    ? inquiries.find(i => i.id === selectedInquiry)
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
              Inquiries
            </h1>
            <p className="text-luxury-textMuted">
              Manage buyer inquiries ({filteredInquiries.length} total)
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
                  placeholder="Search by buyer name, property, or message..."
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
                <option value="new">New</option>
                <option value="responded">Responded</option>
                <option value="in_discussion">In Discussion</option>
                <option value="closed">Closed</option>
              </select>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Inquiries List */}
          <div className="w-full lg:w-1/3 bg-luxury-surface border border-luxury-border rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b border-luxury-border">
              <h2 className="font-semibold text-white">All Inquiries</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredInquiries.length === 0 ? (
                <div className="p-8 text-center text-luxury-textMuted">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No inquiries found</p>
                </div>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <button
                    key={inquiry.id}
                    onClick={() => {
                      setSelectedInquiry(inquiry.id);
                      handleMarkAsRead(inquiry.id);
                    }}
                    className={`w-full p-4 border-b border-luxury-border hover:bg-luxury-muted transition-colors text-left ${
                      selectedInquiry === inquiry.id ? 'bg-luxury-muted' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center text-luxury-black font-semibold">
                          {inquiry.buyer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{inquiry.buyer.name}</p>
                          <p className="text-luxury-textMuted text-xs">{inquiry.propertyTitle}</p>
                        </div>
                      </div>
                      {inquiry.status === 'new' && (
                        <span className="w-2 h-2 bg-luxury-gold rounded-full"></span>
                      )}
                    </div>
                    
                    <p className="text-luxury-textMuted text-sm truncate mb-2">
                      {inquiry.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status.replace('_', ' ')}
                      </span>
                      <span className="text-luxury-textMuted text-xs flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTimeAgo(inquiry.lastActivity)}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Conversation View */}
          <div className="hidden lg:flex flex-1 bg-luxury-surface border border-luxury-border rounded-lg overflow-hidden">
            {!selectedInquiryData ? (
              <div className="flex-1 flex items-center justify-center text-luxury-textMuted">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select an inquiry to view conversation</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                {/* Conversation Header */}
                <div className="p-4 border-b border-luxury-border flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center text-luxury-black font-semibold text-lg">
                      {selectedInquiryData.buyer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{selectedInquiryData.buyer.name}</h3>
                      <p className="text-luxury-textMuted text-sm">{selectedInquiryData.propertyTitle}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`mailto:${selectedInquiryData.buyer.email}`}
                      className="p-2 text-luxury-textMuted hover:text-white transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-5 h-5" />
                    </Link>
                    {selectedInquiryData.buyer.phone && (
                      <a
                        href={`tel:${selectedInquiryData.buyer.phone}`}
                        className="p-2 text-luxury-textMuted hover:text-white transition-colors"
                        title="Call"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                    )}
                    <button
                      onClick={() => handleCloseInquiry(selectedInquiryData.id)}
                      className="p-2 text-luxury-textMuted hover:text-luxury-error transition-colors"
                      title="Close Inquiry"
                    >
                      <Archive className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedInquiryData.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-md ${
                        message.sender === 'seller'
                          ? 'bg-luxury-gold text-luxury-black'
                          : 'bg-luxury-muted text-white'
                      } rounded-lg p-4`}>
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-2 ${
                          message.sender === 'seller' ? 'text-luxury-black/60' : 'text-luxury-textMuted'
                        }`}>
                          {new Date(message.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-luxury-border">
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(selectedInquiryData.id)}
                      placeholder="Type your message..."
                      className="flex-1 bg-luxury-dark border border-luxury-border rounded-lg px-4 py-3 text-white placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold"
                    />
                    <button
                      onClick={() => handleSendMessage(selectedInquiryData.id)}
                      disabled={!newMessage.trim()}
                      className="btn-primary p-3"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SaaSLayout>
  );
}
