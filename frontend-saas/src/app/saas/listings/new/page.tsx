'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Building2 } from 'lucide-react';
import { saasService } from '@/services/saasService';
import { Property, PropertyType, ListingType, PropertyStatus } from '@/types/property';
import { cities, propertyTypes } from '@/data/properties';

export default function NewListingPage() {
  const router = useRouter();
  const [user, setUser] = useState(saasService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>(['']);

  const [formData, setFormData] = useState({
    title: '', description: '', price: '', listingType: 'buy' as ListingType, propertyType: 'apartment' as PropertyType,
    city: 'Addis Ababa', subCity: '', address: '', bedrooms: '', bathrooms: '', size: '', yearBuilt: '', parking: '', furnished: false,
  });

  useEffect(() => { if (!user) router.push('/saas'); }, [user, router]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageChange = (index: number, value: string) => { const newImages = [...images]; newImages[index] = value; setImages(newImages); };
  const addImageField = () => setImages([...images, '']);
  const removeImageField = (index: number) => { if (images.length > 1) setImages(images.filter((_, i) => i !== index)); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const property: Property = {
      id: Date.now().toString(),
      title: formData.title, description: formData.description, price: parseInt(formData.price),
      listingType: formData.listingType, propertyType: formData.propertyType,
      location: { city: formData.city, subCity: formData.subCity, address: formData.address },
      features: { bedrooms: parseInt(formData.bedrooms) || 0, bathrooms: parseInt(formData.bathrooms) || 0, size: parseInt(formData.size) || 0, yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined, parking: formData.parking ? parseInt(formData.parking) : undefined, furnished: formData.furnished },
      images: images.filter(img => img.trim() !== ''),
      status: 'active' as PropertyStatus, featured: false, verified: false, views: 0, inquiries: 0,
      agent: { name: user?.name || 'Agent', phone: '+251000000000', email: user?.email || 'agent@company.com' },
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    saasService.addListing(property);
    await new Promise(r => setTimeout(r, 500));
    router.push('/saas/listings');
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/saas/listings" className="text-luxury-textMuted hover:text-white"><ArrowLeft className="w-6 h-6" /></Link>
        <div><h1 className="font-display text-3xl font-bold text-white">Add New Listing</h1><p className="text-luxury-textMuted">Create a new property listing</p></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-luxury-surface border border-luxury-border p-6">
          <h2 className="font-display text-xl font-semibold text-white mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2"><label className="block text-sm text-luxury-textMuted mb-2">Property Title *</label><input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Luxury Penthouse in Bole" className="input-field" required /></div>
            <div className="md:col-span-2"><label className="block text-sm text-luxury-textMuted mb-2">Description *</label><textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="input-field resize-none" required /></div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Listing Type *</label><select name="listingType" value={formData.listingType} onChange={handleChange} className="input-field"><option value="buy">For Sale</option><option value="rent">For Rent</option></select></div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Property Type *</label><select name="propertyType" value={formData.propertyType} onChange={handleChange} className="input-field">{propertyTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Price (ETB) *</label><input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="e.g., 25000000" className="input-field" required /></div>
          </div>
        </div>

        <div className="bg-luxury-surface border border-luxury-border p-6">
          <h2 className="font-display text-xl font-semibold text-white mb-6">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div><label className="block text-sm text-luxury-textMuted mb-2">City *</label><select name="city" value={formData.city} onChange={handleChange} className="input-field">{cities.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Sub-City *</label><input type="text" name="subCity" value={formData.subCity} onChange={handleChange} placeholder="e.g., Bole" className="input-field" required /></div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Address</label><input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street address" className="input-field" /></div>
          </div>
        </div>

        <div className="bg-luxury-surface border border-luxury-border p-6">
          <h2 className="font-display text-xl font-semibold text-white mb-6">Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div><label className="block text-sm text-luxury-textMuted mb-2">Bedrooms *</label><input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="input-field" required /></div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Bathrooms *</label><input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="input-field" required /></div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Size (m²) *</label><input type="number" name="size" value={formData.size} onChange={handleChange} className="input-field" required /></div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Year Built</label><input type="number" name="yearBuilt" value={formData.yearBuilt} onChange={handleChange} placeholder="e.g., 2023" className="input-field" /></div>
            <div><label className="block text-sm text-luxury-textMuted mb-2">Parking</label><input type="number" name="parking" value={formData.parking} onChange={handleChange} className="input-field" /></div>
            <div className="col-span-2"><label className="flex items-center mt-8 cursor-pointer"><input type="checkbox" name="furnished" checked={formData.furnished} onChange={handleChange} className="w-5 h-5 mr-3" /><span className="text-white">Property is furnished</span></label></div>
          </div>
        </div>

        <div className="bg-luxury-surface border border-luxury-border p-6">
          <h2 className="font-display text-xl font-semibold text-white mb-6">Images</h2>
          <div className="space-y-4">{images.map((img, i) => <div key={i} className="flex items-center gap-3"><input type="url" value={img} onChange={e => handleImageChange(i, e.target.value)} placeholder="https://..." className="input-field flex-1" />{images.length > 1 && <button type="button" onClick={() => removeImageField(i)} className="p-3 text-luxury-textMuted hover:text-luxury-error"><Trash2 className="w-5 h-5" /></button>}</div>)}</div>
          <button type="button" onClick={addImageField} className="mt-4 flex items-center text-luxury-gold"><Plus className="w-5 h-5 mr-2" />Add Image</button>
        </div>

        <div className="flex justify-end space-x-4">
          <Link href="/saas/listings" className="btn-secondary">Cancel</Link>
          <button type="submit" disabled={loading} className="btn-primary flex items-center">{loading ? <div className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" /> : <><Building2 className="w-5 h-5 mr-2" />Create Listing</>}</button>
        </div>
      </form>
    </div>
  );
}