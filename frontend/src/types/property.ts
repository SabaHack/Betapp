export type PropertyType = 'apartment' | 'house' | 'villa' | 'condo' | 'land' | 'commercial';
export type ListingType = 'buy' | 'rent';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  listingType: ListingType;
  propertyType: PropertyType;
  location: {
    city: string;
    subCity: string;
    address: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    size: number;
    yearBuilt?: number;
    parking?: number;
    furnished?: boolean;
  };
  images: string[];
  status: 'active' | 'pending' | 'sold' | 'rented';
  featured: boolean;
  verified: boolean;
  agent: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  listingType?: ListingType;
  propertyType?: PropertyType;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  minSize?: number;
  maxSize?: number;
  featured?: boolean;
  verified?: boolean;
}