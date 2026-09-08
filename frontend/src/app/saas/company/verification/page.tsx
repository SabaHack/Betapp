'use client';

import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  Download,
  Eye,
  Calendar,
  User,
  Building2
} from 'lucide-react';
import SaaSLayout from '@/components/saas/SaaSLayout';
import { currentUserCompany } from '@/data/saasMockData';

export default function CompanyVerificationPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [companyData, setCompanyData] = useState(currentUserCompany);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState([
    { id: 1, name: 'Business License.pdf', status: 'verified', uploadedAt: '2024-01-15' },
    { id: 2, name: 'Tax Registration.pdf', status: 'verified', uploadedAt: '2024-01-15' },
    { id: 3, name: 'Proof of Address.pdf', status: 'pending', uploadedAt: '2024-01-16' }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('betapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-luxury-success/20 text-luxury-success border-luxury-success/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-luxury-muted text-luxury-textMuted border-luxury-border';
    }
  };

  const handleUploadDocument = () => {
    // Simulate upload
    const newDoc = {
      id: uploadedDocuments.length + 1,
      name: 'New Document.pdf',
      status: 'pending',
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setUploadedDocuments([...uploadedDocuments, newDoc]);
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
      <div className="h-[calc(100vh-140px)] overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Company Verification
          </h1>
          <p className="text-luxury-textMuted">
            Complete verification to unlock premium features and build trust with buyers
          </p>
        </div>

        {/* Verification Status Card */}
        <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                companyData.verified 
                  ? 'bg-luxury-success/20 text-luxury-success' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {companyData.verified ? (
                  <CheckCircle className="w-8 h-8" />
                ) : (
                  <Clock className="w-8 h-8" />
                )}
              </div>
              <div>
                <h2 className="text-white text-xl font-semibold">
                  {companyData.verified ? 'Verified Company' : 'Verification In Progress'}
                </h2>
                <p className="text-luxury-textMuted">
                  {companyData.verified 
                    ? `Verified on ${new Date(companyData.verifiedAt || '').toLocaleDateString()}` 
                    : 'Your verification request is being reviewed'}
                </p>
              </div>
            </div>
            
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(companyData.verified ? 'verified' : 'pending')}`}>
              {companyData.verified ? 'Verified' : 'In Review'}
            </span>
          </div>

          {/* Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-luxury-textMuted">Verification Progress</span>
              <span className="text-white font-medium">
                {uploadedDocuments.filter(d => d.status === 'verified').length} / {uploadedDocuments.length} documents verified
              </span>
            </div>
            
            <div className="w-full bg-luxury-dark rounded-full h-2">
              <div 
                className="bg-luxury-gold h-2 rounded-full transition-all"
                style={{ width: `${(uploadedDocuments.filter(d => d.status === 'verified').length / uploadedDocuments.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Verification Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-luxury-success/20 text-luxury-success rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold">Company Information</h3>
            </div>
            <p className="text-luxury-textMuted text-sm">Basic company details provided</p>
          </div>

          <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-luxury-success/20 text-luxury-success rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold">Contact Details</h3>
            </div>
            <p className="text-luxury-textMuted text-sm">Contact information verified</p>
          </div>

          <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                uploadedDocuments.filter(d => d.status === 'verified').length === uploadedDocuments.length
                  ? 'bg-luxury-success/20 text-luxury-success'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {uploadedDocuments.filter(d => d.status === 'verified').length === uploadedDocuments.length ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
              </div>
              <h3 className="text-white font-semibold">Document Upload</h3>
            </div>
            <p className="text-luxury-textMuted text-sm">
              {uploadedDocuments.filter(d => d.status === 'verified').length === uploadedDocuments.length
                ? 'All documents verified'
                : 'Documents under review'
              }
            </p>
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Required Documents
            </h3>
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Document</span>
            </button>
          </div>

          <div className="space-y-4">
            {uploadedDocuments.map((doc) => (
              <div key={doc.id} className="bg-luxury-dark border border-luxury-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-luxury-muted rounded-lg flex items-center justify-center text-luxury-gold">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{doc.name}</p>
                      <p className="text-luxury-textMuted text-sm">Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-luxury-textMuted hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-luxury-textMuted hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Benefits */}
        <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6 mb-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2" />
            Verification Benefits
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-luxury-success mt-0.5" />
              <div>
                <p className="text-white font-medium">Increased Trust</p>
                <p className="text-luxury-textMuted text-sm">Buyers prefer verified companies</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-luxury-success mt-0.5" />
              <div>
                <p className="text-white font-medium">Priority Listing</p>
                <p className="text-luxury-textMuted text-sm">Your properties appear first</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-luxury-success mt-0.5" />
              <div>
                <p className="text-white font-medium">Verified Badge</p>
                <p className="text-luxury-textMuted text-sm">Display on your profile</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-luxury-success mt-0.5" />
              <div>
                <p className="text-white font-medium">Faster Approvals</p>
                <p className="text-luxury-textMuted text-sm">Quick document processing</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-luxury-success mt-0.5" />
              <div>
                <p className="text-white font-medium">Analytics Access</p>
                <p className="text-luxury-textMuted text-sm">Detailed performance insights</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-luxury-success mt-0.5" />
              <div>
                <p className="text-white font-medium">Support Priority</p>
                <p className="text-luxury-textMuted text-sm">Dedicated customer support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Need Help?
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-luxury-muted rounded-lg flex items-center justify-center text-luxury-gold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white font-medium">Document Requirements</p>
                <p className="text-luxury-textMuted text-sm">
                  Upload clear, high-quality scans of your business license, tax registration, and proof of address. All documents must be in PDF format.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-luxury-muted rounded-lg flex items-center justify-center text-luxury-gold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white font-medium">Processing Time</p>
                <p className="text-luxury-textMuted text-sm">
                  Verification typically takes 3-5 business days. You will receive an email notification once your documents are reviewed.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-luxury-muted rounded-lg flex items-center justify-center text-luxury-gold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white font-medium">Contact Support</p>
                <p className="text-luxury-textMuted text-sm">
                  If you have any questions about verification, contact our support team at support@betapp.com
                </p>
              </div>
            </div>
          </div>
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
                  <label className="block text-sm text-luxury-textMuted mb-2">Document Type</label>
                  <select className="input-field">
                    <option value="business_license">Business License</option>
                    <option value="tax_registration">Tax Registration</option>
                    <option value="proof_of_address">Proof of Address</option>
                    <option value="other">Other</option>
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
