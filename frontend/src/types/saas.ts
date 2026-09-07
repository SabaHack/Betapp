// SaaS-specific type definitions for BETAPP Seller SaaS

export type ListingStatus = 'draft' | 'pending_review' | 'published' | 'reserved' | 'sold' | 'under_construction' | 'unavailable' | 'archived';
export type VerificationStatus = 'not_verified' | 'pending_review' | 'verified' | 'rejected';
export type DocumentStatus = 'uploaded' | 'pending_review' | 'verified' | 'rejected';
export type InquiryStatus = 'new' | 'responded' | 'in_discussion' | 'closed';
export type NegotiationStatus = 'offer_received' | 'counteroffer' | 'accepted' | 'rejected' | 'closed';
export type AgreementStatus = 'preparing' | 'sent_to_buyer' | 'buyer_review' | 'awaiting_seller_signature' | 'awaiting_buyer_signature' | 'signed' | 'completed' | 'changes_requested' | 'rejected';
export type SignatureStatus = 'not_signed' | 'awaiting_seller' | 'awaiting_buyer' | 'signed' | 'rejected';
export type ConstructionStatus = 'completed' | 'under_construction' | 'planned' | 'renovation';
export type CompanyType = 'real_estate_agency' | 'developer' | 'property_management' | 'individual_agent';

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  type: CompanyType;
  yearEstablished: number;
  phone: string;
  email: string;
  website?: string;
  address: {
    street: string;
    city: string;
    subCity: string;
    country: string;
  };
  officeLocation?: {
    latitude: number;
    longitude: number;
  };
  areasServed: string[];
  verificationStatus: VerificationStatus;
  verifiedAt?: string;
  licenseNumber?: string;
  taxId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyExtended {
  id: string;
  title: string;
  description: string;
  listingType: 'buy' | 'rent';
  propertyType: 'apartment' | 'house' | 'villa' | 'condo' | 'land' | 'commercial' | 'office' | 'other';
  status: ListingStatus;
  verificationStatus: VerificationStatus;
  propertyId?: string;
  
  // Pricing
  price: number;
  currency: string;
  pricePerSqm?: number;
  negotiable: boolean;
  additionalFees?: number;
  paymentTerms?: string;
  
  // Location
  location: {
    country: string;
    city: string;
    subCity: string;
    neighborhood?: string;
    address: string;
    latitude?: number;
    longitude?: number;
  };
  nearbyInfo?: {
    mainRoad?: string;
    transportation?: string;
    school?: string;
    hospital?: string;
    shopping?: string;
    bank?: string;
  };
  
  // Specifications
  specifications: {
    landArea?: number;
    buildingArea?: number;
    bedrooms?: number;
    bathrooms?: number;
    livingRooms?: number;
    kitchen?: number;
    floors?: number;
    parking?: number;
    balcony?: number;
    garden?: boolean;
    storage?: boolean;
    furnishing?: 'unfurnished' | 'semi_furnished' | 'fully_furnished';
  };
  
  // Construction
  construction?: {
    constructionDate?: string;
    completionDate?: string;
    status: ConstructionStatus;
    developer?: string;
    constructionCompany?: string;
    renovationHistory?: Array<{
      date: string;
      description: string;
    }>;
    lastRenovationDate?: string;
  };
  
  // Amenities
  amenities: string[];
  
  // Media
  images: string[];
  videos?: string[];
  floorPlans?: string[];
  constructionPhotos?: string[];
  virtualTour?: string;
  primaryImageIndex: number;
  
  // Documents
  documents: PropertyDocument[];
  
  // Performance
  performance: {
    views: number;
    favorites: number;
    inquiries: number;
    negotiations: number;
    daysListed: number;
  };
  
  // Metadata
  companyId: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface PropertyDocument {
  id: string;
  name: string;
  type: 'property_document' | 'building_document' | 'supporting_document' | 'other';
  fileUrl: string;
  fileSize: number;
  uploadDate: string;
  status: DocumentStatus;
  visibility: 'public' | 'private';
  verifiedAt?: string;
  rejectionReason?: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  buyer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  messages: InquiryMessage[];
}

export interface InquiryMessage {
  id: string;
  sender: 'buyer' | 'seller';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Negotiation {
  id: string;
  propertyId: string;
  propertyTitle: string;
  askingPrice: number;
  buyer: {
    id: string;
    name: string;
    email: string;
  };
  buyerOffer: number;
  sellerCounteroffer?: number;
  status: NegotiationStatus;
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  history: NegotiationHistory[];
}

export interface NegotiationHistory {
  id: string;
  type: 'offer' | 'counteroffer' | 'accept' | 'reject';
  amount?: number;
  party: 'buyer' | 'seller';
  timestamp: string;
  message?: string;
}

export interface Agreement {
  id: string;
  negotiationId: string;
  propertyId: string;
  propertyTitle: string;
  buyer: {
    id: string;
    name: string;
    email: string;
  };
  agreedPrice: number;
  terms: string;
  status: AgreementStatus;
  importantDates: {
    agreementCreated: string;
    sentToBuyer?: string;
    buyerReview?: string;
    sellerSigned?: string;
    buyerSigned?: string;
    completed?: string;
  };
  signatureStatus: SignatureStatus;
  sellerSignature?: {
    name: string;
    timestamp: string;
    ipAddress?: string;
  };
  buyerSignature?: {
    name: string;
    timestamp: string;
    ipAddress?: string;
  };
  documentUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'property' | 'buyer' | 'agreement' | 'transaction' | 'company';
  relatedId?: string; // propertyId, buyerId, agreementId, etc.
  fileUrl: string;
  fileSize: number;
  fileType: string;
  uploadDate: string;
  uploadedBy: string;
  status: DocumentStatus;
  visibility: 'public' | 'private';
  category?: string;
  description?: string;
  expiresAt?: string;
  relatedType?: 'property' | 'buyer' | 'agreement' | 'transaction' | 'company';
}

export interface Notification {
  id: string;
  type: 'new_inquiry' | 'buyer_response' | 'new_offer' | 'counteroffer' | 'agreement_update' | 'document_update' | 'verification_update' | 'listing_status_change';
  title: string;
  message: string;
  relatedId?: string;
  relatedType?: 'property' | 'inquiry' | 'negotiation' | 'agreement' | 'document' | 'company';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface Activity {
  id: string;
  type: 'new_inquiry' | 'buyer_response' | 'property_published' | 'property_reserved' | 'new_negotiation' | 'document_uploaded' | 'verification_update' | 'agreement_update';
  title: string;
  description: string;
  relatedId?: string;
  relatedType?: 'property' | 'inquiry' | 'negotiation' | 'agreement' | 'document' | 'company';
  timestamp: string;
  actionUrl?: string;
}

export interface Analytics {
  totalViews: number;
  totalFavorites: number;
  totalInquiries: number;
  totalNegotiations: number;
  conversionRate: number;
  propertyPerformance: PropertyPerformance[];
  timeSeriesData: TimeSeriesData[];
}

export interface PropertyPerformance {
  propertyId: string;
  propertyTitle: string;
  views: number;
  favorites: number;
  inquiries: number;
  negotiations: number;
  daysListed: number;
  currentStatus: ListingStatus;
}

export interface TimeSeriesData {
  date: string;
  views: number;
  inquiries: number;
  negotiations: number;
}

export interface UserSettings {
  account: {
    name: string;
    email: string;
    phone: string;
  };
  company: {
    companyId: string;
  };
  notifications: {
    email: boolean;
    platform: boolean;
    newInquiry: boolean;
    buyerResponse: boolean;
    newOffer: boolean;
    agreementUpdate: boolean;
    documentUpdate: boolean;
    verificationUpdate: boolean;
  };
  preferences: {
    currency: string;
    language: string;
    timezone: string;
  };
}
