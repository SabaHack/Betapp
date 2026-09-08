'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download,
  Upload,
  Eye,
  Trash2,
  File,
  FileImage,
  FileVideo,
  CheckCircle,
  Clock,
  Calendar,
  Folder
} from 'lucide-react';
import SaaSLayout from '@/components/saas/SaaSLayout';
import { mockDocuments, currentUserCompany } from '@/data/saasMockData';
import { DocumentStatus } from '@/types/saas';

export default function DocumentsPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [documents, setDocuments] = useState(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<DocumentStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('betapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'verified':
        return 'bg-luxury-success/20 text-luxury-success border-luxury-success/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-luxury-muted text-luxury-textMuted border-luxury-border';
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <FileImage className="w-5 h-5" />;
    if (type.includes('video')) return <FileVideo className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = 
      document.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      document.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || document.status === statusFilter;
    const matchesType = typeFilter === 'all' || document.relatedType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDeleteDocument = (documentId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== documentId));
    }
  };

  const handleUploadDocument = () => {
    // Simulate upload
    const newDocument = {
      id: `doc-${Date.now()}`,
      name: 'New Document',
      type: 'property_document',
      fileUrl: '#',
      fileSize: 1024000,
      uploadDate: new Date().toISOString(),
      status: 'pending' as DocumentStatus,
      visibility: 'private' as const,
      relatedType: 'property' as const,
      relatedId: 'prop-1'
    };
    setDocuments([newDocument, ...documents]);
    setShowUploadModal(false);
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
      <div className="h-[calc(100vh-140px)] flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Documents
            </h1>
            <p className="text-luxury-textMuted">
              Manage your documents ({filteredDocuments.length} total)
            </p>
          </div>
          
          <button
            onClick={() => setShowUploadModal(true)}
            className="btn-primary flex items-center justify-center"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Document
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-luxury-surface border border-luxury-border p-4 rounded-lg mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-textMuted" />
                <input
                  type="text"
                  placeholder="Search by document name or type..."
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
              <div className="flex gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-luxury-dark border border-luxury-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
                
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-luxury-dark border border-luxury-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                >
                  <option value="all">All Types</option>
                  <option value="property">Property</option>
                  <option value="company">Company</option>
                  <option value="agreement">Agreement</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="flex-1 overflow-y-auto">
          {filteredDocuments.length === 0 ? (
            <div className="bg-luxury-surface border border-luxury-border rounded-lg p-12 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-luxury-textMuted opacity-50" />
              <p className="text-luxury-textMuted mb-4">No documents found</p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="btn-primary"
              >
                Upload Your First Document
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((document) => (
                <div key={document.id} className="bg-luxury-surface border border-luxury-border rounded-lg p-4 hover:border-luxury-gold transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-luxury-muted rounded-lg flex items-center justify-center text-luxury-gold">
                      {getFileIcon(document.type)}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(document.status)}`}>
                      {document.status}
                    </span>
                  </div>
                  
                  <h3 className="text-white font-medium mb-1 truncate" title={document.name}>
                    {document.name}
                  </h3>
                  
                  <p className="text-luxury-textMuted text-sm mb-3 capitalize">
                    {document.type.replace(/_/g, ' ')}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-luxury-textMuted mb-3">
                    <span>{formatFileSize(document.fileSize)}</span>
                    <span>{formatDate(document.uploadDate)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                    <button
                      onClick={() => handleDeleteDocument(document.id)}
                      className="p-2 text-luxury-textMuted hover:text-luxury-error transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6 max-w-lg w-full mx-4">
              <h3 className="text-white font-semibold mb-4">Upload Document</h3>
              
              <div className="bg-luxury-dark border-2 border-dashed border-luxury-border rounded-lg p-8 mb-4 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-luxury-textMuted" />
                <p className="text-white mb-2">Drag and drop your file here</p>
                <p className="text-luxury-textMuted text-sm mb-4">or click to browse</p>
                <button className="btn-primary text-sm">
                  Select File
                </button>
              </div>
              
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Document Name</label>
                  <input
                    type="text"
                    placeholder="Enter document name"
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Document Type</label>
                  <select className="input-field">
                    <option value="property_document">Property Document</option>
                    <option value="building_document">Building Document</option>
                    <option value="supporting_document">Supporting Document</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Visibility</label>
                  <select className="input-field">
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadDocument}
                  className="btn-primary flex-1"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SaaSLayout>
  );
}
