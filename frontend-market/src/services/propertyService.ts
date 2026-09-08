import { Property, PropertyFilters } from '@/types/property';
import { mockProperties } from '@/data/properties';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyService = {
  async getAllProperties(filters?: PropertyFilters): Promise<Property[]> {
    await delay(300);
    let result = [...mockProperties];
    if (filters?.listingType) result = result.filter(p => p.listingType === filters.listingType);
    if (filters?.propertyType) result = result.filter(p => p.propertyType === filters.propertyType);
    if (filters?.city) result = result.filter(p => p.location.city === filters.city);
    if (filters?.minPrice) result = result.filter(p => p.price >= filters.minPrice!);
    if (filters?.maxPrice) result = result.filter(p => p.price <= filters.maxPrice!);
    if (filters?.bedrooms) result = result.filter(p => p.features.bedrooms >= filters.bedrooms!);
    if (filters?.minSize) result = result.filter(p => p.features.size >= filters.minSize!);
    if (filters?.maxSize) result = result.filter(p => p.features.size <= filters.maxSize!);
    if (filters?.featured) result = result.filter(p => p.featured);
    if (filters?.verified) result = result.filter(p => p.verified);
    return result;
  },
  async getPropertyById(id: string): Promise<Property | undefined> {
    await delay(200);
    return mockProperties.find(p => p.id === id);
  },
  async getFeaturedProperties(): Promise<Property[]> {
    await delay(200);
    return mockProperties.filter(p => p.featured);
  },
};

const SAVED_KEY = 'betapp_market_saved';
const RECENT_KEY = 'betapp_market_recent';

export const userPropertyService = {
  getSavedProperties(): Property[] {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(SAVED_KEY);
    return saved ? JSON.parse(saved) : [];
  },
  saveProperty(property: Property): void {
    const saved = this.getSavedProperties();
    if (!saved.find(p => p.id === property.id)) {
      saved.push(property);
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    }
  },
  removeSavedProperty(propertyId: string): void {
    const saved = this.getSavedProperties().filter(p => p.id !== propertyId);
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  },
  isPropertySaved(propertyId: string): boolean {
    return this.getSavedProperties().some(p => p.id === propertyId);
  },
  getRecentlyViewed(): Property[] {
    if (typeof window === 'undefined') return [];
    const recent = localStorage.getItem(RECENT_KEY);
    return recent ? JSON.parse(recent) : [];
  },
  addToRecentlyViewed(property: Property): void {
    let recent = this.getRecentlyViewed();
    recent = recent.filter(p => p.id !== property.id);
    recent.unshift(property);
    recent = recent.slice(0, 10);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  },
};