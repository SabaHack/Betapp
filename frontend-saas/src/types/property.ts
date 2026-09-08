export type PropertyType = 'apartment' | 'house' | 'villa' | 'condo' | 'land' | 'commercial';
export type ListingType = 'buy' | 'rent';
export type PropertyStatus = 'active' | 'pending' | 'sold' | 'rented' | 'draft';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  listingType: ListingType;
  propertyType: PropertyType;
  location: { city: string; subCity: string; address: string };
  features: { bedrooms: number; bathrooms: number; size: number; yearBuilt?: number; parking?: number; furnished?: boolean };
  images: string[];
  status: PropertyStatus;
  featured: boolean;
  verified: boolean;
  views: number;
  inquiries: number;
  agent: { name: string; phone: string; email: string };
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  verified: boolean;
  rating: number;
  totalListings: number;
  joinedAt: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  message: string;
  status: 'new' | 'contacted' | 'completed' | 'archived';
  createdAt: string;
}

export interface Agreement {
  id: string;
  propertyId: string;
  propertyTitle: string;
  buyerName: string;
  sellerName: string;
  price: number;
  status: 'draft' | 'pending' | 'signed' | 'completed' | 'cancelled';
  signedAt?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}