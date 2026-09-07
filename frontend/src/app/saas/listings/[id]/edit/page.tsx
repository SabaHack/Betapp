'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
import { currentUserCompany, mockExtendedProperties } from '@/data/saasMockData';
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
  { id: 10, title: 'Review & Update' },
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

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [property, setProperty] = useState<PropertyExtended | null>(null);

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

    // Load property data
    const foundProperty = mockExtendedProperties.find(p => p.id === propertyId);
    if (foundProperty) {
      setProperty(foundProperty);
      setFormData({
        title: foundProperty.title,
        propertyType: foundProperty.propertyType,
        listingType: foundProperty.listingType,
        propertyStatus: foundProperty.status,
        propertyId: foundProperty.id,
        price: foundProperty.price.toString(),
        currency: foundProperty.currency,
        pricePerSqm: foundProperty.pricePerSqm?.toString() || '',
        negotiable: foundProperty.negotiable,
        additionalFees: '',
        paymentTerms: '',
        country: foundProperty.location.country,
        city: foundProperty.location.city,
        subCity: foundProperty.location.subCity || '',
        neighborhood: foundProperty.location.neighborhood || '',
        address: foundProperty.location.address,
        latitude: foundProperty.location.latitude?.toString() || '',
        longitude: foundProperty.location.longitude?.toString() || '',
        mainRoad: '',
        transportation: '',
        school: '',
        hospital: '',
        shopping: '',
        bank: '',
        landArea: foundProperty.specifications.landArea?.toString() || '',
        buildingArea: foundProperty.specifications.buildingArea?.toString() || '',
        bedrooms: foundProperty.specifications.bedrooms?.toString() || '',
        bathrooms: foundProperty.specifications.bathrooms?.toString() || '',
        livingRooms: foundProperty.specifications.livingRooms?.toString() || '',
        kitchen: foundProperty.specifications.kitchen?.toString() || '',
        floors: foundProperty.specifications.floors?.toString() || '',
        parking: foundProperty.specifications.parking?.toString() || '',
        balcony: foundProperty.specifications.balcony?.toString() || '',
        garden: foundProperty.specifications.garden || false,
        storage: false,
        furnishing: foundProperty.specifications.furnishing || 'unfurnished',
        constructionDate: foundProperty.construction?.constructionDate || '',
        completionDate: foundProperty.construction?.completionDate || '',
        constructionStatus: foundProperty.construction?.status || 'completed',
        developer: foundProperty.construction?.developer || '',
        constructionCompany: foundProperty.construction?.constructionCompany || '',
        renovationHistory: '',
        lastRenovationDate: '',
        amenities: foundProperty.amenities || [],
        images: foundProperty.images || [],
        videos: foundProperty.videos || [],
        floorPlans: foundProperty.floorPlans || [],
        constructionPhotos: foundProperty.constructionPhotos || [],
        virtualTour: foundProperty.virtualTour || '',
        primaryImageIndex: 0,
        documents: foundProperty.documents || [],
        description: foundProperty.description || '',
      });
    }
  }, [propertyId, router]);

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

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/saas/listings');
    }, 1500);
  };

  const handleSaveDraft = () => {
    setSavingDraft(true);
    setTimeout(() => {
      setSavingDraft(false);
    }, 1000);
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  if (!user || !property) {
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/saas/listings" className="text-luxury-textMuted hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="font-display text-3xl font-bold text-white mb-1">
                Edit Property
              </h1>
              <p className="text-luxury-textMuted">
                {property.title}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveDraft}
              disabled={savingDraft}
              className="btn-secondary flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{savingDraft ? 'Saving...' : 'Save Draft'}</span>
            </button>
            
            <button
              onClick={() => router.push(`/saas/listings/${propertyId}`)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Eye className="w-5 h-5" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    currentStep >= step.id
                      ? 'bg-luxury-gold text-luxury-black'
                      : 'bg-luxury-dark text-luxury-textMuted border border-luxury-border'
                  }`}>
                    {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`text-xs mt-2 ${
                    currentStep >= step.id ? 'text-white' : 'text-luxury-textMuted'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > step.id ? 'bg-luxury-gold' : 'bg-luxury-dark'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-luxury-surface border border-luxury-border rounded-lg p-6 mb-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
              
              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Property Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  placeholder="Enter property title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Property Type</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="input-field"
                  >
                    {propertyTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Listing Type</label>
                  <select
                    value={formData.listingType}
                    onChange={(e) => setFormData({ ...formData, listingType: e.target.value as 'buy' | 'rent' })}
                    className="input-field"
                  >
                    <option value="buy">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Property ID</label>
                <input
                  type="text"
                  value={formData.propertyId}
                  onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                  className="input-field"
                  placeholder="Enter property ID"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Pricing</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input-field"
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="input-field"
                  >
                    <option value="ETB">ETB - Ethiopian Birr</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Price per Sqm (Optional)</label>
                <input
                  type="number"
                  value={formData.pricePerSqm}
                  onChange={(e) => setFormData({ ...formData, pricePerSqm: e.target.value })}
                  className="input-field"
                  placeholder="Enter price per square meter"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="negotiable"
                  checked={formData.negotiable}
                  onChange={(e) => setFormData({ ...formData, negotiable: e.target.checked })}
                  className="w-5 h-5 rounded border-luxury-border bg-luxury-dark text-luxury-gold focus:ring-luxury-gold"
                />
                <label htmlFor="negotiable" className="text-white">Price is negotiable</label>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Additional Fees (Optional)</label>
                <input
                  type="text"
                  value={formData.additionalFees}
                  onChange={(e) => setFormData({ ...formData, additionalFees: e.target.value })}
                  className="input-field"
                  placeholder="e.g., maintenance fees, association fees"
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Payment Terms (Optional)</label>
                <textarea
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                  className="input-field"
                  rows={3}
                  placeholder="Enter payment terms"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Location</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Sub City</label>
                  <input
                    type="text"
                    value={formData.subCity}
                    onChange={(e) => setFormData({ ...formData, subCity: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Neighborhood</label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input-field"
                  placeholder="Full address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Latitude (Optional)</label>
                  <input
                    type="text"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    className="input-field"
                    placeholder="Enter latitude"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Longitude (Optional)</label>
                  <input
                    type="text"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    className="input-field"
                    placeholder="Enter longitude"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Specifications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Land Area (sqm)</label>
                  <input
                    type="number"
                    value={formData.landArea}
                    onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                    className="input-field"
                    placeholder="Enter land area"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Building Area (sqm)</label>
                  <input
                    type="number"
                    value={formData.buildingArea}
                    onChange={(e) => setFormData({ ...formData, buildingArea: e.target.value })}
                    className="input-field"
                    placeholder="Enter building area"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="input-field"
                    placeholder="Number of bedrooms"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="input-field"
                    placeholder="Number of bathrooms"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Living Rooms</label>
                  <input
                    type="number"
                    value={formData.livingRooms}
                    onChange={(e) => setFormData({ ...formData, livingRooms: e.target.value })}
                    className="input-field"
                    placeholder="Number of living rooms"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Kitchen</label>
                  <input
                    type="number"
                    value={formData.kitchen}
                    onChange={(e) => setFormData({ ...formData, kitchen: e.target.value })}
                    className="input-field"
                    placeholder="Number of kitchens"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Floors</label>
                  <input
                    type="number"
                    value={formData.floors}
                    onChange={(e) => setFormData({ ...formData, floors: e.target.value })}
                    className="input-field"
                    placeholder="Number of floors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Parking</label>
                  <input
                    type="number"
                    value={formData.parking}
                    onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                    className="input-field"
                    placeholder="Number of parking spaces"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Balcony/Terrace Area (sqm)</label>
                  <input
                    type="number"
                    value={formData.balcony}
                    onChange={(e) => setFormData({ ...formData, balcony: e.target.value })}
                    className="input-field"
                    placeholder="Enter balcony area"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Furnishing</label>
                  <select
                    value={formData.furnishing}
                    onChange={(e) => setFormData({ ...formData, furnishing: e.target.value as any })}
                    className="input-field"
                  >
                    <option value="unfurnished">Unfurnished</option>
                    <option value="semi_furnished">Semi Furnished</option>
                    <option value="fully_furnished">Fully Furnished</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="garden"
                    checked={formData.garden}
                    onChange={(e) => setFormData({ ...formData, garden: e.target.checked })}
                    className="w-5 h-5 rounded border-luxury-border bg-luxury-dark text-luxury-gold focus:ring-luxury-gold"
                  />
                  <label htmlFor="garden" className="text-white">Has Garden</label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="storage"
                    checked={formData.storage}
                    onChange={(e) => setFormData({ ...formData, storage: e.target.checked })}
                    className="w-5 h-5 rounded border-luxury-border bg-luxury-dark text-luxury-gold focus:ring-luxury-gold"
                  />
                  <label htmlFor="storage" className="text-white">Has Storage</label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Construction</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Construction Date</label>
                  <input
                    type="date"
                    value={formData.constructionDate}
                    onChange={(e) => setFormData({ ...formData, constructionDate: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Completion Date</label>
                  <input
                    type="date"
                    value={formData.completionDate}
                    onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Construction Status</label>
                  <select
                    value={formData.constructionStatus}
                    onChange={(e) => setFormData({ ...formData, constructionStatus: e.target.value as ConstructionStatus })}
                    className="input-field"
                  >
                    <option value="completed">Completed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="planned">Planned</option>
                    <option value="under_construction">Under Construction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Developer</label>
                  <input
                    type="text"
                    value={formData.developer}
                    onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                    className="input-field"
                    placeholder="Developer name"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Construction Company</label>
                  <input
                    type="text"
                    value={formData.constructionCompany}
                    onChange={(e) => setFormData({ ...formData, constructionCompany: e.target.value })}
                    className="input-field"
                    placeholder="Construction company name"
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-textMuted mb-2">Last Renovation Date</label>
                  <input
                    type="date"
                    value={formData.lastRenovationDate}
                    onChange={(e) => setFormData({ ...formData, lastRenovationDate: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Renovation History (Optional)</label>
                <textarea
                  value={formData.renovationHistory}
                  onChange={(e) => setFormData({ ...formData, renovationHistory: e.target.value })}
                  className="input-field"
                  rows={3}
                  placeholder="Describe any renovations done"
                />
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Amenities</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {amenityOptions.map((amenity) => (
                  <button
                    key={amenity.id}
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.amenities.includes(amenity.id)
                        ? 'border-luxury-gold bg-luxury-gold/20 text-luxury-gold'
                        : 'border-luxury-border bg-luxury-dark text-luxury-textMuted hover:border-luxury-gold/50'
                    }`}
                  >
                    <span className="text-sm">{amenity.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Media</h2>
              
              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Images</label>
                <div className="space-y-3">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => updateImage(index, e.target.value)}
                        className="input-field flex-1"
                        placeholder="Image URL"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="p-2 text-luxury-error hover:text-red-400"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addImage}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Image</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Virtual Tour URL (Optional)</label>
                <input
                  type="url"
                  value={formData.virtualTour}
                  onChange={(e) => setFormData({ ...formData, virtualTour: e.target.value })}
                  className="input-field"
                  placeholder="Enter virtual tour URL"
                />
              </div>
            </div>
          )}

          {currentStep === 8 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Documents</h2>
              
              <div className="bg-luxury-dark border-2 border-dashed border-luxury-border rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-luxury-textMuted" />
                <p className="text-luxury-textMuted mb-4">Drag and drop documents here or click to browse</p>
                <button className="btn-primary text-sm">
                  Select Files
                </button>
              </div>
            </div>
          )}

          {currentStep === 9 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
              
              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Property Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows={8}
                  placeholder="Enter detailed property description"
                />
              </div>
            </div>
          )}

          {currentStep === 10 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Review & Update</h2>
              
              <div className="space-y-4">
                <div className="bg-luxury-dark rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Basic Information</h3>
                  <p className="text-luxury-textMuted text-sm">{formData.title}</p>
                  <p className="text-luxury-textMuted text-sm">{propertyTypes.find(t => t.value === formData.propertyType)?.label}</p>
                </div>

                <div className="bg-luxury-dark rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Pricing</h3>
                  <p className="text-luxury-textMuted text-sm">{formData.currency} {formData.price}</p>
                  <p className="text-luxury-textMuted text-sm">{formData.negotiable ? 'Negotiable' : 'Fixed Price'}</p>
                </div>

                <div className="bg-luxury-dark rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Location</h3>
                  <p className="text-luxury-textMuted text-sm">{formData.city}, {formData.country}</p>
                  <p className="text-luxury-textMuted text-sm">{formData.address}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`btn-secondary flex items-center space-x-2 ${
              currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {currentStep === steps.length ? (
            <button
              onClick={handleSave}
              disabled={loading}
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? 'UpdatingProperty...' : 'Update Property'}</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn-primary flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </SaaSLayout>
  );
}
