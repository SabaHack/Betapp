import { Property, Company, Inquiry, Agreement, Notification } from '@/types/property';

export const mockProperties: Property[] = [
  { id: '1', title: 'Luxury Penthouse in Bole', description: 'Stunning penthouse with panoramic views', price: 45000000, listingType: 'buy', propertyType: 'apartment', location: { city: 'Addis Ababa', subCity: 'Bole', address: 'Bole Road' }, features: { bedrooms: 4, bathrooms: 3, size: 280, yearBuilt: 2023, parking: 2 }, images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'], status: 'active', featured: true, verified: true, views: 1250, inquiries: 45, agent: { name: 'Tadesse Bekele', phone: '+251911234567', email: 'tadesse@company.com' }, createdAt: '2024-01-15T10:00:00Z', updatedAt: '2024-01-15T10:00:00Z' },
  { id: '2', title: 'Modern Villa in CMC', description: 'Elegant 5-bedroom villa', price: 85000000, listingType: 'buy', propertyType: 'villa', location: { city: 'Addis Ababa', subCity: 'CMC', address: 'Cameroon Street' }, features: { bedrooms: 5, bathrooms: 4, size: 450, yearBuilt: 2022, parking: 3, furnished: true }, images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'], status: 'active', featured: true, verified: true, views: 980, inquiries: 32, agent: { name: 'Mekdes Tadesse', phone: '+251912345678', email: 'mekdes@company.com' }, createdAt: '2024-01-10T10:00:00Z', updatedAt: '2024-01-10T10:00:00Z' },
  { id: '3', title: 'Executive Apartment', description: 'Fully furnished 3-bedroom apartment', price: 180000, listingType: 'rent', propertyType: 'apartment', location: { city: 'Addis Ababa', subCity: 'Kazanchis', address: 'Kirkos' }, features: { bedrooms: 3, bathrooms: 2, size: 180, yearBuilt: 2021, parking: 1, furnished: true }, images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'], status: 'active', featured: false, verified: true, views: 650, inquiries: 18, agent: { name: 'Samuel Alemayehu', phone: '+251913456789', email: 'samuel@company.com' }, createdAt: '2024-01-08T10:00:00Z', updatedAt: '2024-01-08T10:00:00Z' },
  { id: '4', title: 'Family Home in Ayer Tena', description: 'Beautiful 4-bedroom house', price: 55000000, listingType: 'buy', propertyType: 'house', location: { city: 'Addis Ababa', subCity: 'Ayer Tena', address: 'Kolfe' }, features: { bedrooms: 4, bathrooms: 3, size: 320, yearBuilt: 2020, parking: 2 }, images: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800'], status: 'pending', featured: false, verified: true, views: 420, inquiries: 12, agent: { name: 'Fatuma Ahmed', phone: '+251914567890', email: 'fatuma@company.com' }, createdAt: '2024-01-05T10:00:00Z', updatedAt: '2024-01-05T10:00:00Z' },
  { id: '5', title: 'Premium Condo', description: 'Contemporary condo in Megenagna', price: 28000000, listingType: 'buy', propertyType: 'condo', location: { city: 'Addis Ababa', subCity: 'Megenagna', address: 'Roundabout' }, features: { bedrooms: 2, bathrooms: 2, size: 150, yearBuilt: 2023, parking: 1 }, images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'], status: 'active', featured: false, verified: true, views: 380, inquiries: 8, agent: { name: 'Dawit Mengistu', phone: '+251915678901', email: 'dawit@company.com' }, createdAt: '2024-01-03T10:00:00Z', updatedAt: '2024-01-03T10:00:00Z' },
];

export const mockCompany: Company = {
  id: '1', name: 'Premium Real Estate Ethiopia', description: 'Leading real estate company in Ethiopia', address: 'Bole Road, Addis Ababa', phone: '+251 11 123 4567', email: 'info@company.com', website: 'https://company.com', verified: true, rating: 4.8, totalListings: 45, joinedAt: '2023-01-01T10:00:00Z',
};

export const mockInquiries: Inquiry[] = [
  { id: '1', propertyId: '1', propertyTitle: 'Luxury Penthouse in Bole', buyerName: 'John Doe', buyerEmail: 'john@example.com', buyerPhone: '+251911234567', message: 'Interested in this property', status: 'new', createdAt: '2024-01-20T10:00:00Z' },
  { id: '2', propertyId: '1', propertyTitle: 'Luxury Penthouse in Bole', buyerName: 'Sarah Johnson', buyerEmail: 'sarah@example.com', buyerPhone: '+251912345678', message: 'Can I schedule a viewing?', status: 'contacted', createdAt: '2024-01-19T10:00:00Z' },
  { id: '3', propertyId: '2', propertyTitle: 'Modern Villa in CMC', buyerName: 'Michael Smith', buyerEmail: 'michael@example.com', buyerPhone: '+251913456789', message: 'What is the final price?', status: 'new', createdAt: '2024-01-18T10:00:00Z' },
];

export const mockAgreements: Agreement[] = [
  { id: '1', propertyId: '1', propertyTitle: 'Luxury Penthouse in Bole', buyerName: 'John Doe', sellerName: 'Premium Real Estate', price: 45000000, status: 'signed', signedAt: '2024-01-15T10:00:00Z', createdAt: '2024-01-10T10:00:00Z' },
  { id: '2', propertyId: '3', propertyTitle: 'Executive Apartment', buyerName: 'Sarah Johnson', sellerName: 'Premium Real Estate', price: 180000, status: 'pending', createdAt: '2024-01-18T10:00:00Z' },
];

export const mockNotifications: Notification[] = [
  { id: '1', title: 'New Inquiry', message: 'You have a new inquiry for Luxury Penthouse', type: 'info', read: false, createdAt: '2024-01-20T10:00:00Z' },
  { id: '2', title: 'Property Sold', message: 'Your property has been sold!', type: 'success', read: true, createdAt: '2024-01-15T10:00:00Z' },
  { id: '3', title: 'Verification Pending', message: 'Please complete your company verification', type: 'warning', read: false, createdAt: '2024-01-14T10:00:00Z' },
];

export const cities = ['Addis Ababa', 'Bahir Dar', 'Dire Dawa', 'Hawassa'];
export const propertyTypes = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'condo', label: 'Condo' },
  { value: 'land', label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
];