'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Building2, User, LogOut } from 'lucide-react';
import { userPropertyService } from '@/services/propertyService';
import { Property, PropertyType, ListingType } from '@/types/property';
import { cities, subCities, propertyTypes } from '@/data/properties';

export default function AddPropertyPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>(['']);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    listingType: 'buy' as ListingType,
    propertyType: 'apartment' as PropertyType,
    city: 'Addis Ababa',
    subCity: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    yearBuilt: '',
    parking: '',
    furnished: false,
  });

  useEffect(() => {
    const userData = localStorage.getItem('betapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, '']);
  };

  const removeImageField = (index: number) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('betapp_user');
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Create property object
    const property: Property = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      price: parseInt(formData.price),
      listingType: formData.listingType,
      propertyType: formData.propertyType,
      location: {
        city: formData.city,
        subCity: formData.subCity,
        address: formData.address,
      },
      features: {
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        size: parseInt(formData.size) || 0,
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined,
        parking: formData.parking ? parseInt(formData.parking) : undefined,
        furnished: formData.furnished,
      },
      images: images.filter(img => img.trim() !== ''),
      status: 'active',
      featured: false,
      verified: false,
      agent: {
        name: user?.name || 'Agent',
        phone: '+251000000000',
        email: user?.email || 'agent@betapp.com',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save listing
    userPropertyService.addListing(property);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    router.push('/seller');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-luxury-dark">
      {/* Header */}
      <div className="bg-luxury-charcoal border-b border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/seller" className="text-luxury-textMuted hover:text-white">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="font-display text-2xl font-bold text-white">
                  Add New Property
                </h1>
                <p className="text-luxury-textMuted text-sm">Create a new listing</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-luxury-textMuted hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-luxury-surface border border-luxury-border p-6">
            <h2 className="font-display text-xl font-semibold text-white mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm text-luxury-textMuted mb-2">Property Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Luxury Penthouse in Bole"
                  className="input-field"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-luxury-textMuted mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your property..."
                  rows={4}
                  className="input-field resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Listing Type *</label>
                <select
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="buy">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Property Type *</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">
                  Price (ETB) {formData.listingType === 'rent' && '/month'} *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 25000000"
                  className="input-field"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-luxury-surface border border-luxury-border p-6">
            <h2 className="font-display text-xl font-semibold text-white mb-6">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">City *</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Sub-City/Area *</label>
                <select
                  name="subCity"
                  value={formData.subCity}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select area</option>
                  {(subCities[formData.city] || []).map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-luxury-surface border border-luxury-border p-6">
            <h2 className="font-display text-xl font-semibold text-white mb-6">Property Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Bedrooms *</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="0"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Bathrooms *</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="0"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Size (m²) *</label>
                <input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="0"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Year Built</label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleChange}
                  placeholder="e.g., 2023"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Parking Spaces</label>
                <input
                  type="number"
                  name="parking"
                  value={formData.parking}
                  onChange={handleChange}
                  placeholder="0"
                  className="input-field"
                />
              </div>

              <div className="col-span-2 md:col-span-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="furnished"
                    checked={formData.furnished}
                    onChange={handleChange}
                    className="w-5 h-5 bg-luxury-muted border-luxury-border rounded focus:ring-luxury-gold"
                  />
                  <span className="ml-3 text-white">Property is furnished</span>
                </label>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-luxury-surface border border-luxury-border p-6">
            <h2 className="font-display text-xl font-semibold text-white mb-6">Images</h2>
            <p className="text-luxury-textMuted text-sm mb-4">
              Add image URLs for your property. The first image will be the main photo.
            </p>
            <div className="space-y-4">
              {images.map((image, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="input-field flex-1"
                  />
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="p-3 text-luxury-textMuted hover:text-luxury-error transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addImageField}
              className="mt-4 flex items-center text-luxury-gold hover:text-luxury-goldLight transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Another Image
            </button>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end space-x-4">
            <Link href="/seller" className="btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Building2 className="w-5 h-5 mr-2" />
                  Create Listing
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}