'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Eye, 
  Building2, 
  CheckCircle,
  Upload,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import SaaSLayout from '@/components/saas/SaaSLayout';
import { currentUserCompany } from '@/data/saasMockData';
import { PropertyExtended, ListingStatus, ConstructionStatus } from '@/types/saas';

const steps = [
  { id: 1, title: 'Basic Information' },
  { id: 2, title: 'Pricing' },
  { id: 3, title: 'Location' },
  { id: 4, title: 'Specifications' },
  { id: 5, title: 'Construction' },
  { id: 6, title: 'Amenities' },
  { id: 7, title: 'Media' },
  { id: 8, title: 'Documents' },
  { id: 9, title: 'Description' },
  { id: 10, title: 'Review & Publish' },
];

const propertyTypes = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'condo', label: 'Condominium' },
  { value: 'land', label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'office', label: 'Office' },
  { value: 'other', label: 'Other' },
];

const amenityOptions = [
  { id: 'parking', label: 'Parking' },
  { id: 'elevator', label: 'Elevator' },
  { id: 'pool', label: 'Pool' },
  { id: 'gym', label: 'Gym' },
  { id: 'security', label: 'Security' },
  { id: 'cctv', label: 'CCTV' },
  { id: 'backup_water', label: 'Backup Water' },
  { id: 'generator', label: 'Generator' },
  { id: 'internet', label: 'Internet' },
  { id: 'garden', label: 'Garden' },
  { id: 'balcony', label: 'Balcony/Terrace' },
  { id: 'heating', label: 'Heating' },
  { id: 'ac', label: 'AC' },
  { id: 'gated_compound', label: 'Gated Compound' },
  { id: 'laundry_area', label: 'Laundry Area' },
];

export default function AddPropertyPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    title: '',
    propertyType: 'apartment' as any,
    listingType: 'buy' as 'buy' | 'rent',
    propertyStatus: 'draft' as ListingStatus,
    propertyId: '',
    
    // Step 2: Pricing
    price: '',
    currency: 'ETB',
    pricePerSqm: '',
    negotiable: true,
    additionalFees: '',
    paymentTerms: '',
    
    // Step 3: Location
    country: 'Ethiopia',
    city: 'Addis Ababa',
    subCity: '',
    neighborhood: '',
    address: '',
    latitude: '',
    longitude: '',
    mainRoad: '',
    transportation: '',
    school: '',
    hospital: '',
    shopping: '',
    bank: '',
    
    // Step 4: Specifications
    landArea: '',
    buildingArea: '',
    bedrooms: '',
    bathrooms: '',
    livingRooms: '',
    kitchen: '',
    floors: '',
    parking: '',
    balcony: '',
    garden: false,
    storage: false,
    furnishing: 'unfurnished' as 'unfurnished' | 'semi_furnished' | 'fully_furnished',
    
    // Step 5: Construction
    constructionDate: '',
    completionDate: '',
    constructionStatus: 'completed' as ConstructionStatus,
    developer: '',
    constructionCompany: '',
    renovationHistory: '',
    lastRenovationDate: '',
    
    // Step 6: Amenities
    amenities: [] as string[],
    
    // Step 7: Media
    images: [''] as string[],
    videos: [''] as string[],
    floorPlans: [''] as string[],
    constructionPhotos: [''] as string[],
    virtualTour: '',
    primaryImageIndex: 0,
    
    // Step 8: Documents
    documents: [] as Array<{ name: string; type: string; fileUrl: string }>,
    
    // Step 9: Description
    description: '',
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

  const handleAmenityToggle = (amenityId: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenityId)
        ? formData.amenities.filter(a => a !== amenityId)
        : [...formData.amenities, amenityId]
    });
  };

  const addImageField = (type: 'images' | 'videos' | 'floorPlans' | 'constructionPhotos') => {
    setFormData({
      ...formData,
      [type]: [...formData[type], '']
    });
  };

  const removeImageField = (type: 'images' | 'videos' | 'floorPlans' | 'constructionPhotos', index: number) => {
    if (formData[type].length > 1) {
      setFormData({
        ...formData,
        [type]: formData[type].filter((_, i) => i !== index)
      });
    }
  };

  const handleImageChange = (type: 'images' | 'videos' | 'floorPlans' | 'constructionPhotos', index: number, value: string) => {
    const newArray = [...formData[type]];
    newArray[index] = value;
    setFormData({ ...formData, [type]: newArray });
  };

  const setPrimaryImage = (index: number) => {
    setFormData({ ...formData, primaryImageIndex: index });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    setSavingDraft(true);
    // Simulate saving draft
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSavingDraft(false);
    alert('Draft saved successfully!');
  };

  const handlePublish = async () => {
    setLoading(true);
    // Simulate publishing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    router.push('/saas/listings');
  };

  if (!user) {
    return null;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold text-white mb-6">Basic Information</h2>
            
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
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Property Type *</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="input-field"
                >
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Listing Type *</label>
                <select
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="buy">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Property Status</label>
                <select
                  name="propertyStatus"
                  value={formData.propertyStatus}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                  <option value="under_construction">Under Construction</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Property ID</label>
                <input
                  type="text"
                  name="propertyId"
                  value={formData.propertyId}
                  onChange={handleChange}
                  placeholder="Auto-generated or custom ID"
                  className="input-field"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold text-white mb-6">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 25000000"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="ETB">ETB - Ethiopian Birr</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Price per m²</label>
                <input
                  type="number"
                  name="pricePerSqm"
                  value={formData.pricePerSqm}
                  onChange={handleChange}
                  placeholder="Auto-calculated or manual"
                  className="input-field"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="negotiable"
                    checked={formData.negotiable}
                    onChange={handleChange}
                    className="w-5 h-5 bg-luxury-muted border-luxury-border rounded focus:ring-luxury-gold"
                  />
                  <span className="ml-3 text-white">Price is negotiable</span>
                </label>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Additional Fees</label>
                <input
                  type="number"
                  name="additionalFees"
                  value={formData.additionalFees}
                  onChange={handleChange}
                  placeholder="e.g., 500000"
                  className="input-field"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-luxury-textMuted mb-2">Payment Terms</label>
                <textarea
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleChange}
                  placeholder="e.g., 30% down payment, balance over 12 months"
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold text-white mb-6">Location</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Sub-City/Area *</label>
                <input
                  type="text"
                  name="subCity"
                  value={formData.subCity}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Neighborhood</label>
                <input
                  type="text"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-luxury-textMuted mb-2">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="e.g., 8.9936"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="e.g., 38.7635"
                  className="input-field"
                />
              </div>
            </div>

            <div className="border-t border-luxury-border pt-6">
              <h3 className="font-display text-lg font-semibold text-white mb-4">Nearby Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Main Road</label>
                  <input
                    type="text"
                    name="mainRoad"
                    value={formData.mainRoad}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Transportation</label>
                  <input
                    type="text"
                    name="transportation"
                    value={formData.transportation}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">School</label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Hospital</label>
                  <input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Shopping</label>
                  <input
                    type="text"
                    name="shopping"
                    value={formData.shopping}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Bank</label>
                  <input
                    type="text"
                    name="bank"
                    value={formData.bank}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold text-white mb-6">Specifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Land Area (m²)</label>
                <input
                  type="number"
                  name="landArea"
                  value={formData.landArea}
                  onChange={handleChange}
                  placeholder="0"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Building Area (m²)</label>
                <input
                  type="number"
                  name="buildingArea"
                  value={formData.buildingArea}
                  onChange={handleChange}
                  placeholder="0"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="0"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="0"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Living Rooms</label>
                <input
                  type="number"
                  name="livingRooms"
                  value={formData.livingRooms}
                  onChange={handleChange}
                  placeholder="0"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Kitchen</label>
                <input
                  type="number"
                  name="kitchen"
                  value={formData.kitchen}
                  onChange={handleChange}
                  placeholder="0"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Floors</label>
                <input
                  type="number"
                  name="floors"
                  value={formData.floors}
                  onChange={handleChange}
                  placeholder="0"
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

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Balcony</label>
                <input
                  type="number"
                  name="balcony"
                  value={formData.balcony}
                  onChange={handleChange}
                  placeholder="0"
                  className="input-field"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="garden"
                    checked={formData.garden}
                    onChange={handleChange}
                    className="w-5 h-5 bg-luxury-muted border-luxury-border rounded focus:ring-luxury-gold"
                  />
                  <span className="ml-3 text-white">Garden</span>
                </label>
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="storage"
                    checked={formData.storage}
                    onChange={handleChange}
                    className="w-5 h-5 bg-luxury-muted border-luxury-border rounded focus:ring-luxury-gold"
                  />
                  <span className="ml-3 text-white">Storage</span>
                </label>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Furnishing</label>
                <select
                  name="furnishing"
                  value={formData.furnishing}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi_furnished">Semi Furnished</option>
                  <option value="fully_furnished">Fully Furnished</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold text-white mb-6">Construction</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Construction Date</label>
                <input
                  type="date"
                  name="constructionDate"
                  value={formData.constructionDate}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Completion Date</label>
                <input
                  type="date"
                  name="completionDate"
                  value={formData.completionDate}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Construction Status</label>
                <select
                  name="constructionStatus"
                  value={formData.constructionStatus}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="completed">Completed</option>
                  <option value="under_construction">Under Construction</option>
                  <option value="planned">Planned</option>
                  <option value="renovation">Renovation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Developer</label>
                <input
                  type="text"
                  name="developer"
                  value={formData.developer}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Construction Company</label>
                <input
                  type="text"
                  name="constructionCompany"
                  value={formData.constructionCompany}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Last Renovation Date</label>
                <input
                  type="date"
                  name="lastRenovationDate"
                  value={formData.lastRenovationDate}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-luxury-textMuted mb-2">Renovation History</label>
                <textarea
                  name="renovationHistory"
                  value={formData.renovationHistory}
                  onChange={handleChange}
                  placeholder="Describe any renovations..."
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold text-white mb-6">Amenities</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenityOptions.map((amenity) => (
                <label
                  key={amenity.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.amenities.includes(amenity.id)
                      ? 'border-luxury-gold bg-luxury-gold/10'
                      : 'border-luxury-border hover:border-luxury-gold/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity.id)}
                    onChange={() => handleAmenityToggle(amenity.id)}
                    className="w-5 h-5 bg-luxury-muted border-luxury-border rounded focus:ring-luxury-gold"
                  />
                  <span className="ml-3 text-white">{amenity.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold text-white mb-6">Media</h2>
            
            {/* Property Photos */}
            <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
              <h3 className="font-semibold text-white mb-4">Property Photos</h3>
              <p className="text-luxury-textMuted text-sm mb-4">
                Add image URLs. The first image will be the main photo.
              </p>
              <div className="space-y-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <button
                      onClick={() => setPrimaryImage(index)}
                      className={`w-8 h-8 flex items-center justify-center rounded ${
                        formData.primaryImageIndex === index
                          ? 'bg-luxury-gold text-luxury-black'
                          : 'bg-luxury-muted text-luxury-textMuted'
                      }`}
                      title="Set as primary"
                    >
                      {formData.primaryImageIndex === index && <CheckCircle className="w-4 h-4" />}
                    </button>
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange('images', index, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="input-field flex-1"
                    />
                    {formData.images.length > 1 && (
                      <button
                        onClick={() => removeImageField('images', index)}
                        className="p-2 text-luxury-textMuted hover:text-luxury-error transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => addImageField('images')}
                className="mt-4 flex items-center text-luxury-gold hover:text-luxury-goldLight transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Another Photo
              </button>
            </div>

            {/* Videos */}
            <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
              <h3 className="font-semibold text-white mb-4">Videos</h3>
              <div className="space-y-3">
                {formData.videos.map((video, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="url"
                      value={video}
                      onChange={(e) => handleImageChange('videos', index, e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="input-field flex-1"
                    />
                    {formData.videos.length > 1 && (
                      <button
                        onClick={() => removeImageField('videos', index)}
                        className="p-2 text-luxury-textMuted hover:text-luxury-error transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => addImageField('videos')}
                className="mt-4 flex items-center text-luxury-gold hover:text-luxury-goldLight transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Video
              </button>
            </div>

            {/* Floor Plans */}
            <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
              <h3 className="font-semibold text-white mb-4">Floor Plans</h3>
              <div className="space-y-3">
                {formData.floorPlans.map((plan, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="url"
                      value={plan}
                      onChange={(e) => handleImageChange('floorPlans', index, e.target.value)}
                      placeholder="https://example.com/floorplan.jpg"
                      className="input-field flex-1"
                    />
                    {formData.floorPlans.length > 1 && (
                      <button
                        onClick={() => removeImageField('floorPlans', index)}
                        className="p-2 text-luxury-textMuted hover:text-luxury-error transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => addImageField('floorPlans')}
                className="mt-4 flex items-center text-luxury-gold hover:text-luxury-goldLight transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Floor Plan
              </button>
            </div>

            {/* Virtual Tour */}
            <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
              <h3 className="font-semibold text-white mb-4">Virtual Tour</h3>
              <input
                type="url"
                name="virtualTour"
                value={formData.virtualTour}
                onChange={handleChange}
                placeholder="https://example.com/virtual-tour"
                className="input-field"
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold text-white mb-6">Documents</h2>
            
            <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
              <div className="text-center py-8 border-2 border-dashed border-luxury-border rounded-lg">
                <Upload className="w-12 h-12 text-luxury-textMuted mx-auto mb-4" />
                <p className="text-luxury-textMuted mb-2">
                  Upload property documents (title deed, building certificate, etc.)
                </p>
                <button className="btn-secondary mt-4">
                  Upload Documents
                </button>
              </div>
              
              <p className="text-luxury-textMuted text-sm mt-4 text-center">
                This is a frontend prototype. Document upload will be implemented with backend integration.
              </p>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold text-white mb-6">Description</h2>
            
            <div>
              <label className="block text-sm text-luxury-textMuted mb-2">Property Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property in detail. Include key features, unique selling points, and any other relevant information..."
                rows={10}
                className="input-field resize-none"
              />
              <p className="text-luxury-textMuted text-sm mt-2">
                {formData.description.length} characters
              </p>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold text-white mb-6">Review & Publish</h2>
            
            <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
              <h3 className="font-semibold text-white mb-4">Property Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-luxury-textMuted text-sm">Title</p>
                  <p className="text-white">{formData.title || 'Not provided'}</p>
                </div>
                
                <div>
                  <p className="text-luxury-textMuted text-sm">Type</p>
                  <p className="text-white capitalize">{formData.propertyType}</p>
                </div>
                
                <div>
                  <p className="text-luxury-textMuted text-sm">Listing Type</p>
                  <p className="text-white capitalize">{formData.listingType}</p>
                </div>
                
                <div>
                  <p className="text-luxury-textMuted text-sm">Price</p>
                  <p className="text-white">{formData.price ? `${formData.currency} ${parseInt(formData.price).toLocaleString()}` : 'Not provided'}</p>
                </div>
                
                <div>
                  <p className="text-luxury-textMuted text-sm">Location</p>
                  <p className="text-white">{formData.subCity}, {formData.city}</p>
                </div>
                
                <div>
                  <p className="text-luxury-textMuted text-sm">Status</p>
                  <p className="text-white capitalize">{formData.propertyStatus.replace('_', ' ')}</p>
                </div>
              </div>
            </div>

            <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg">
              <h3 className="font-semibold text-white mb-4">Preview</h3>
              <p className="text-luxury-textMuted text-sm mb-4">
                This is how your property will appear on BETAPP Marketplace.
              </p>
              
              {formData.images[0] ? (
                <div className="relative h-64 bg-luxury-dark rounded-lg overflow-hidden mb-4">
                  <img
                    src={formData.images[0]}
                    alt="Property preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-64 bg-luxury-dark rounded-lg flex items-center justify-center mb-4">
                  <p className="text-luxury-textMuted">No images uploaded</p>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="btn-secondary"
                >
                  Edit Property
                </button>
                <button
                  onClick={handlePublish}
                  disabled={loading}
                  className="btn-primary flex items-center"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Building2 className="w-5 h-5 mr-2" />
                      Publish Listing
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <SaaSLayout 
      userName={user.name}
      companyName={currentUserCompany.name}
      notificationCount={3}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/saas/listings" className="text-luxury-textMuted hover:text-white flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Listings
          </Link>
        </div>

        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Add New Property
        </h1>
        <p className="text-luxury-textMuted mb-8">
          Complete all steps to add your property to BETAPP Marketplace.
        </p>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep === step.id
                    ? 'bg-luxury-gold text-luxury-black'
                    : currentStep > step.id
                    ? 'bg-luxury-success text-white'
                    : 'bg-luxury-muted text-luxury-textMuted'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > step.id ? 'bg-luxury-success' : 'bg-luxury-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="text-xs text-luxury-textMuted w-20 text-center">
                {step.title}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-luxury-surface border border-luxury-border p-6 rounded-lg mb-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
              currentStep === 1
                ? 'text-luxury-textMuted cursor-not-allowed'
                : 'text-white hover:bg-luxury-muted'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleSaveDraft}
              disabled={savingDraft}
              className="flex items-center px-6 py-3 border border-luxury-border text-white rounded-lg hover:bg-luxury-muted transition-colors"
            >
              <Save className="w-5 h-5 mr-2" />
              {savingDraft ? 'Saving...' : 'Save Draft'}
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="flex items-center btn-primary"
              >
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </SaaSLayout>
  );
}
