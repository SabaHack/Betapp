import { Property, Company, Inquiry, Agreement, Notification, PropertyStatus } from '@/types/property';
import { mockProperties, mockCompany, mockInquiries, mockAgreements, mockNotifications } from '@/data/properties';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Company auth simulation
export interface SaaSUser { id: string; name: string; email: string; companyId: string; role: 'admin' | 'agent'; }

const COMPANY_KEY = 'betapp_saas_company';
const LISTINGS_KEY = 'betapp_saas_listings';
const INQUIRIES_KEY = 'betapp_saas_inquiries';
const AGREEMENTS_KEY = 'betapp_saas_agreements';
const NOTIFICATIONS_KEY = 'betapp_saas_notifications';

export const saasService = {
  // Auth
  async login(email: string, password: string): Promise<SaaSUser | null> {
    await delay(800);
    if (email === 'admin@company.com' && password === 'admin123') {
      const user: SaaSUser = { id: '1', name: 'Company Admin', email, companyId: '1', role: 'admin' };
      localStorage.setItem('betapp_saas_user', JSON.stringify(user));
      return user;
    }
    return null;
  },

  getCurrentUser(): SaaSUser | null {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('betapp_saas_user');
    return user ? JSON.parse(user) : null;
  },

  logout() { localStorage.removeItem('betapp_saas_user'); },

  // Company
  getCompany(): Company | null {
    if (typeof window === 'undefined') return null;
    const c = localStorage.getItem(COMPANY_KEY);
    return c ? JSON.parse(c) : mockCompany;
  },

  // Properties/Listings
  getListings(): Property[] {
    if (typeof window === 'undefined') return mockProperties;
    const l = localStorage.getItem(LISTINGS_KEY);
    if (!l) { localStorage.setItem(LISTINGS_KEY, JSON.stringify(mockProperties)); return mockProperties; }
    return JSON.parse(l);
  },

  addListing(property: Property): void {
    const listings = this.getListings();
    listings.unshift(property);
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
  },

  updateListing(property: Property): void {
    const listings = this.getListings().map(p => p.id === property.id ? property : p);
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
  },

  deleteListing(id: string): void {
    const listings = this.getListings().filter(p => p.id !== id);
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
  },

  updateListingStatus(id: string, status: PropertyStatus): void {
    const listings = this.getListings().map(p => p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p);
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
  },

  // Inquiries
  getInquiries(): Inquiry[] {
    if (typeof window === 'undefined') return mockInquiries;
    const i = localStorage.getItem(INQUIRIES_KEY);
    if (!i) { localStorage.setItem(INQUIRIES_KEY, JSON.stringify(mockInquiries)); return mockInquiries; }
    return JSON.parse(i);
  },

  updateInquiryStatus(id: string, status: Inquiry['status']): void {
    const inquiries = this.getInquiries().map(i => i.id === id ? { ...i, status } : i);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
  },

  // Agreements
  getAgreements(): Agreement[] {
    if (typeof window === 'undefined') return mockAgreements;
    const a = localStorage.getItem(AGREEMENTS_KEY);
    if (!a) { localStorage.setItem(AGREEMENTS_KEY, JSON.stringify(mockAgreements)); return mockAgreements; }
    return JSON.parse(a);
  },

  createAgreement(agreement: Agreement): void {
    const agreements = this.getAgreements();
    agreements.unshift(agreement);
    localStorage.setItem(AGREEMENTS_KEY, JSON.stringify(agreements));
  },

  updateAgreementStatus(id: string, status: Agreement['status']): void {
    const agreements = this.getAgreements().map(a => a.id === id ? { ...a, status, signedAt: status === 'signed' ? new Date().toISOString() : a.signedAt } : a);
    localStorage.setItem(AGREEMENTS_KEY, JSON.stringify(agreements));
  },

  // Notifications
  getNotifications(): Notification[] {
    if (typeof window === 'undefined') return mockNotifications;
    const n = localStorage.getItem(NOTIFICATIONS_KEY);
    if (!n) { localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(mockNotifications)); return mockNotifications; }
    return JSON.parse(n);
  },

  markNotificationRead(id: string): void {
    const notifications = this.getNotifications().map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  },

  markAllNotificationsRead(): void {
    const notifications = this.getNotifications().map(n => ({ ...n, read: true }));
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  },

  getUnreadCount(): number {
    return this.getNotifications().filter(n => !n.read).length;
  },
};