'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { propertyService } from '@/services/propertyService';
import { Property, PropertyFilters, ListingType, PropertyType } from '@/types/property';
import { cities, subCities, propertyTypes } from '@/data/properties';

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const setSearchParams = useSearchParams()[1];
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [filters, setFilters] = useState<PropertyFilters>({
    listingType: undefined,
    propertyType: undefined,
    city: undefined,
  });

  // Initialize filters from URL params after hydration
  useEffect(() => {
    if (searchParams) {
      setFilters({
        listingType: (searchParams.get('type') as ListingType) || undefined,
        propertyType: (searchParams.get('propertyType') as PropertyType) || undefined,
        city: searchParams.get('city') || undefined,
      });
      setIsReady(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isReady) {
      loadProperties();
    }
  }, [filters, isReady]);

  const loadProperties = async () => {
    setLoading(true);
    const result = await propertyService.getAllProperties(filters);
    setProperties(result);
    setLoading(false);
  };

  const handleFilterChange = (key: keyof PropertyFilters, value: string | undefined) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.listingType) params.set('type', newFilters.listingType);
    if (newFilters.propertyType) params.set('propertyType', newFilters.propertyType);
    if (newFilters.city) params.set('city', newFilters.city);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchParams({});
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-luxury-dark">
      {/* Header */}
      <div className="bg-luxury-charcoal border-b border-luxury-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-white mb-4">Properties</h1>
          <p className="text-luxury-textMuted">
            Discover {properties.length} properties across Ethiopia
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="bg-luxury-surface border border-luxury-border p-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-textMuted" />
              <input
                type="text"
                placeholder="Search properties..."
                className="input-field pl-10"
              />
            </div>

            {/* Buy/Rent Toggle */}
            <div className="flex rounded-none overflow-hidden border border-luxury-border">
              <button
                onClick={() => handleFilterChange('listingType', filters.listingType === 'buy' ? undefined : 'buy')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  filters.listingType === 'buy'
                    ? 'bg-luxury-gold text-luxury-black'
                    : 'bg-luxury-surface text-luxury-textMuted hover:text-white'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => handleFilterChange('listingType', filters.listingType === 'rent' ? undefined : 'rent')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  filters.listingType === 'rent'
                    ? 'bg-luxury-gold text-luxury-black'
                    : 'bg-luxury-surface text-luxury-textMuted hover:text-white'
                }`}
              >
                Rent
              </button>
            </div>

            {/* City Filter */}
            <select
              value={filters.city || ''}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="input-field w-auto"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {/* Property Type */}
            <select
              value={filters.propertyType || ''}
              onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              className="input-field w-auto"
            >
              <option value="">All Types</option>
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 border transition-colors ${
                showFilters || activeFiltersCount > 2
                  ? 'border-luxury-gold text-luxury-gold'
                  : 'border-luxury-border text-luxury-textMuted hover:text-white'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 2 && (
                <span className="ml-2 w-5 h-5 bg-luxury-gold text-luxury-black text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount - 2}
                </span>
              )}
            </button>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center text-luxury-textMuted hover:text-white transition-colors"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-luxury-border grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Min Price (ETB)</label>
                <input
                  type="number"
                  placeholder="Min price"
                  className="input-field"
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Max Price (ETB)</label>
                <input
                  type="number"
                  placeholder="Max price"
                  className="input-field"
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-luxury-textMuted mb-2">Bedrooms</label>
                <select
                  className="input-field"
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>
          )}
        </div>

        // Results */}
        {!isReady || loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="font-display text-2xl text-white mb-2">No properties found</h3>
            <p className="text-luxury-textMuted mb-4">Try adjusting your filters</p>
            <button onClick={clearFilters} className="btn-secondary">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}